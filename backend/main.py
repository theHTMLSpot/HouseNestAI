from fastapi import FastAPI
from typing import Optional
import logging

from api.v1.endpoints.root import root as root_endpoint

app = FastAPI()

@app.get("/")
async def root(jwt: Optional[str] = None):
    """
    Root endpoint that accepts JWT as a query parameter and returns the user's email name.
    """
    email = None
    if jwt:
        try:
            # Decode the JWT to extract the email (assuming a standard payload structure)
            payload = jwt.decode(jwt, options={"verify_signature": False})  # No signature verification for simplicity
            email = payload.get("email")
        except Exception as e:
            logging.error(f"Failed to decode JWT: {e}")
    
    logging.warning(f"JWT Email: {email}")
    return root_endpoint(email=email)  # Pass the extracted email to the root endpoint


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)