from typing import Optional  # Corrected import
import logging
# Define the expected structure of the request payload


def root(email: Optional[str] = None):
    """
    Root endpoint for the API.
    """
    logging.warning("Root endpoint called")
    # Extract email from JWT payload
    
    if email is None:
        logging.warning("Invalid email")
        return {"message": "Welcome, to house nest ai's api. go to /docs for more information and /signup for signup"}
    logging.warning(email) 
    
    name = email.split("@")[0]
    return {"message": f"Hello, {name}! Welcome, to house nest ai's api. go to /docs for more information"}