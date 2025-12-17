# import os
# import glob
# from dotenv import load_dotenv
# from qdrant_client import QdrantClient, models
# from cohere import Client as CohereClient
# from unstructured.partition.text import partition_text

# from rich.console import Console

# # --- CONFIGURATION ---
# load_dotenv()
# console = Console()

# # Qdrant Configuration
# QDRANT_URL = os.getenv("QDRANT_URL")
# QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
# COLLECTION_NAME = "ai_book_rag"

# # Cohere Configuration
# COHERE_API_KEY = os.getenv("COHERE_API_KEY")
# COHERE_EMBED_MODEL = "embed-english-v3.0"
# # Cohere's 'embed-english-v3.0' model has 1024 dimensions
# VECTOR_SIZE = 1024

# # --- MAIN INGESTION LOGIC ---

# def get_docs_content():
#     """Reads all markdown files from the '../docs' directory."""
#     markdown_files = glob.glob("../docs/**/*.md", recursive=True)
#     if not markdown_files:
#         console.print("[yellow]Warning: No markdown files found in '../docs'.[/yellow]")
#         return []
        
#     console.print(f"Found {len(markdown_files)} markdown files.")
    
#     all_elements = []
#     for file_path in markdown_files:
#         with console.status(f"Processing {os.path.basename(file_path)}...", spinner="dots"):
#             try:
#                 # Use unstructured to partition the markdown file
#                 elements = partition_text(filename=file_path)
#                 # We store the source filename in the metadata for each chunk
#                 for element in elements:
#                     element.metadata.source = os.path.basename(file_path)
#                 all_elements.extend(elements)
#             except Exception as e:
#                 console.print(f"[red]Error processing {file_path}: {e}[/red]")
    
#     console.print(f"Total text chunks extracted: {len(all_elements)}")
#     return all_elements

# def main():
#     """Main function to ingest data into Qdrant."""
#     # --- 1. INITIALIZE CLIENTS ---
#     try:
#         qdrant_client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)
#         cohere_client = CohereClient(api_key=COHERE_API_KEY)
#         console.print("[green]Successfully connected to Qdrant and Cohere.[/green]")
#     except Exception as e:
#         console.print(f"[red]Failed to connect to services: {e}[/red]")
#         console.print("[bold red]Please check your .env file and environment variables.[/bold red]")
#         return

#     # --- 2. CREATE QDRANT COLLECTION ---
#     try:
#         collections = qdrant_client.get_collections().collections
#         collection_names = [collection.name for collection in collections]

#         if COLLECTION_NAME not in collection_names:
#             console.print(f"Collection '{COLLECTION_NAME}' not found. Creating it now...")
#             qdrant_client.create_collection(
#                 collection_name=COLLECTION_NAME,
#                 vectors_config=models.VectorParams(size=VECTOR_SIZE, distance=models.Distance.COSINE),
#             )
#             console.print(f"[green]Collection '{COLLECTION_NAME}' created successfully.[/green]")
#         else:
#             console.print(f"Collection '{COLLECTION_NAME}' already exists.")

#     except Exception as e:
#         console.print(f"[red]Error with Qdrant collection setup: {e}[/red]")
#         return

#     # --- 3. GET AND PROCESS DOCUMENTS ---
#     elements = get_docs_content()
#     if not elements:
#         console.print("[yellow]No content to ingest. Exiting.[/yellow]")
#         return
        
#     texts_to_embed = [str(el) for el in elements]

#     # --- 4. GENERATE EMBEDDINGS ---
#     with console.status("Generating embeddings with Cohere...", spinner="earth"):
#         try:
#             response = cohere_client.embed(
#                 texts=texts_to_embed,
#                 model=COHERE_EMBED_MODEL,
#                 input_type="search_document"
#             )
#             embeddings = response.embeddings
#             console.print("[green]Embeddings generated successfully.[/green]")
#         except Exception as e:
#             console.print(f"[red]Failed to generate embeddings: {e}[/red]")
#             return

#     # --- 5. UPLOAD TO QDRANT ---
#     with console.status(f"Uploading {len(elements)} vectors to Qdrant...", spinner="arc"):
#         try:
#             qdrant_client.upsert(
#                 collection_name=COLLECTION_NAME,
#                 points=[
#                     models.PointStruct(
#                         id=idx,  # Simple integer IDs
#                         vector=embedding,
#                         payload={
#                             "text": str(element),
#                             "source": element.metadata.source,
#                         },
#                     )
#                     for idx, (element, embedding) in enumerate(zip(elements, embeddings))
#                 ],
#                 wait=True,
#             )
#             console.print(f"[bold green]Successfully uploaded {len(elements)} data points to Qdrant![/bold green]")
#         except Exception as e:
#             console.print(f"[red]Failed to upload data to Qdrant: {e}[/red]")
#             return

# if __name__ == "__main__":
#     main()



import os
import glob
from dotenv import load_dotenv
from qdrant_client import QdrantClient, models
from cohere import Client as CohereClient
from unstructured.partition.text import partition_text
from rich.console import Console

# --- CONFIGURATION ---
load_dotenv()
console = Console()

# Qdrant Configuration
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
COLLECTION_NAME = "ai_book_rag"

# Cohere Configuration
COHERE_API_KEY = os.getenv("COHERE_API_KEY")
COHERE_EMBED_MODEL = "embed-english-v3.0"
VECTOR_SIZE = 1024  # Cohere's 'embed-english-v3.0' model has 1024 dimensions

# --- MAIN INGESTION LOGIC ---

def get_docs_content():
    """Reads all markdown files from the '../docs' directory."""
    markdown_files = glob.glob("../docs/**/*.md", recursive=True)
    if not markdown_files:
        console.print("[yellow]Warning: No markdown files found in '../docs'.[/yellow]")
        return []
        
    console.print(f"Found {len(markdown_files)} markdown files.")
    
    all_elements = []
    for file_path in markdown_files:
        with console.status(f"Processing {os.path.basename(file_path)}...", spinner="dots"):
            try:
                # Use unstructured to partition the markdown file
                elements = partition_text(filename=file_path)
                # Store the source filename in metadata for each chunk
                for element in elements:
                    element.metadata.source = os.path.basename(file_path)
                all_elements.extend(elements)
            except Exception as e:
                console.print(f"[red]Error processing {file_path}: {e}[/red]")
    
    console.print(f"Total text chunks extracted: {len(all_elements)}")
    return all_elements

def main():
    """Main function to ingest data into Qdrant."""
    # --- 1. INITIALIZE CLIENTS ---
    try:
        qdrant_client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)
        cohere_client = CohereClient(api_key=COHERE_API_KEY)
        console.print("[green]Successfully connected to Qdrant and Cohere.[/green]")
    except Exception as e:
        console.print(f"[red]Failed to connect to services: {e}[/red]")
        console.print("[bold red]Please check your .env file and environment variables.[/bold red]")
        return

    # --- 2. CREATE QDRANT COLLECTION ---
    try:
        collections = qdrant_client.get_collections().collections
        collection_names = [collection.name for collection in collections]

        if COLLECTION_NAME not in collection_names:
            console.print(f"Collection '{COLLECTION_NAME}' not found. Creating it now...")
            qdrant_client.create_collection(
                collection_name=COLLECTION_NAME,
                vectors_config=models.VectorParams(size=VECTOR_SIZE, distance=models.Distance.COSINE),
            )
            console.print(f"[green]Collection '{COLLECTION_NAME}' created successfully.[/green]")
        else:
            console.print(f"Collection '{COLLECTION_NAME}' already exists.")

    except Exception as e:
        console.print(f"[red]Error with Qdrant collection setup: {e}[/red]")
        return

    # --- 3. GET AND PROCESS DOCUMENTS ---
    elements = get_docs_content()
    if not elements:
        console.print("[yellow]No content to ingest. Exiting.[/yellow]")
        return
        
    texts_to_embed = [str(el) for el in elements]

    # --- 4. GENERATE EMBEDDINGS ---
    with console.status("Generating embeddings with Cohere...", spinner="earth"):
        try:
            response = cohere_client.embed(
                texts=texts_to_embed,
                model=COHERE_EMBED_MODEL,
                input_type="search_document"
            )
            embeddings = response.embeddings
            console.print("[green]Embeddings generated successfully.[/green]")
        except Exception as e:
            console.print(f"[red]Failed to generate embeddings: {e}[/red]")
            return

    # --- 5. UPLOAD TO QDRANT WITH BATCHING ---
    batch_size = 50  # Adjust batch size to avoid timeout errors

    points = [
        models.PointStruct(
            id=idx,
            vector=embedding,
            payload={
                "text": str(element),
                "source": element.metadata.source,
            },
        )
        for idx, (element, embedding) in enumerate(zip(elements, embeddings))
    ]

    with console.status(f"Uploading {len(points)} vectors to Qdrant in batches...", spinner="arc"):
        try:
            for i in range(0, len(points), batch_size):
                batch = points[i:i+batch_size]
                qdrant_client.upsert(
                    collection_name=COLLECTION_NAME,
                    points=batch,
                    wait=True
                )
                console.print(f"[green]Uploaded batch {i//batch_size + 1} ({len(batch)} points)[/green]")
            console.print(f"[bold green]Successfully uploaded all {len(points)} points to Qdrant![/bold green]")
        except Exception as e:
            console.print(f"[red]Failed to upload batch to Qdrant: {e}[/red]")
            return

if __name__ == "__main__":
    main()

