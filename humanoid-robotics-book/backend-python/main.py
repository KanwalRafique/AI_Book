import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from qdrant_client import QdrantClient
from cohere import Client as CohereClient
from rich.console import Console

# --- CONFIGURATION ---
load_dotenv()
console = Console()

# FastAPI App Initialization
app = FastAPI(
    title="AI Book RAG Chatbot",
    description="A simple RAG chatbot using FastAPI, Cohere, and Qdrant.",
    version="1.0.0",
)

# --- CLIENT INITIALIZATION ---
try:
    # Qdrant Configuration
    QDRANT_URL = os.getenv("QDRANT_URL")
    QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
    COLLECTION_NAME = "ai_book_rag"

    # Cohere Configuration
    COHERE_API_KEY = os.getenv("COHERE_API_KEY")
    COHERE_EMBED_MODEL = "embed-english-v3.0"
    COHERE_CHAT_MODEL = "command-r"

    # Initialize clients
    qdrant_client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)
    cohere_client = CohereClient(api_key=COHERE_API_KEY)
    
    console.print("[green]Successfully connected to Qdrant and Cohere.[/green]")
    
except Exception as e:
    console.print(f"[bold red]FATAL ERROR: Could not connect to services.[/bold red]")
    console.print(f"[red]Error details: {e}[/red]")
    console.print("[yellow]Please check your .env file and ensure Qdrant and Cohere services are accessible.[/yellow]")
    # Exit if we can't connect to essential services
    exit()

# --- API MODELS ---
class ChatRequest(BaseModel):
    query: str
    top_k: int = 3 # Number of search results to retrieve

class ChatResponse(BaseModel):
    answer: str
    sources: list[str]

# --- RAG CHATBOT LOGIC ---
@app.post("/chat", response_model=ChatResponse)
async def chat_with_rag(request: ChatRequest):
    """
    Handles the chat request by performing Retrieval-Augmented Generation.
    """
    try:
        # 1. Generate an embedding for the user's query
        with console.status("Generating query embedding...", spinner="dots"):
            query_embedding_response = cohere_client.embed(
                texts=[request.query],
                model=COHERE_EMBED_MODEL,
                input_type="search_query"
            )
            query_embedding = query_embedding_response.embeddings[0]
        
        # 2. Search for similar documents in Qdrant
        with console.status("Searching for relevant documents...", spinner="dots"):
            search_results = qdrant_client.search(
                collection_name=COLLECTION_NAME,
                query_vector=query_embedding,
                limit=request.top_k,
                with_payload=True,
            )
        
        # 3. Format the retrieved documents as context
        documents = []
        for result in search_results:
            documents.append({
                "title": result.payload.get("source", "Unknown Source"),
                "snippet": result.payload.get("text", "")
            })

        if not documents:
            console.print("[yellow]No relevant documents found for the query.[/yellow]")
            return ChatResponse(answer="I couldn't find any relevant information in the documents to answer your question.", sources=[])

        # 4. Use Cohere's Chat API with RAG to generate an answer
        with console.status("Generating answer...", spinner="dots"):
            chat_response = cohere_client.chat(
                model=COHERE_CHAT_MODEL,
                message=request.query,
                documents=documents,
                prompt_truncation='AUTO' # Ensures the prompt stays within model's context window
            )
            answer = chat_response.text
        
        # Collect unique sources
        sources = list(set(doc["title"] for doc in documents))

        console.print(f"[cyan]Query:[/cyan] {request.query}")
        console.print(f"[green]Answer:[/green] {answer}")
        console.print(f"[yellow]Sources:[/yellow] {sources}")

        return ChatResponse(answer=answer, sources=sources)

    except Exception as e:
        console.print(f"[bold red]An error occurred during chat processing: {e}[/bold red]")
        raise HTTPException(status_code=500, detail="An internal error occurred while processing the chat request.")

# --- HEALTH CHECK ENDPOINT ---
@app.get("/health")
async def health_check():
    """A simple endpoint to confirm the API is running."""
    return {"status": "ok"}

# --- RUN THE APP (for local development) ---
if __name__ == "__main__":
    import uvicorn
    console.print("[bold magenta]Starting FastAPI server...[/bold magenta]")
    console.print("Access the API docs at [link=http://127.0.0.1:8000/docs]http://127.0.0.1:8000/docs[/link]")
    uvicorn.run(app, host="127.0.0.1", port=8000)
