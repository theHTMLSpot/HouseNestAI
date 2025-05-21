from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

app = FastAPI()

@app.get("/greeting/")
async def root():
	return {"message": "Hello World"}

@app.get("/greeting/{name}/")
async def get_name(name: str):
	return {"Hello ": name}


if __name__ == "__main__":
	import uvicorn

	uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)