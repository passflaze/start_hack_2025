import json
import requests
from pathlib import Path

data = requests.get("http://localhost:8000/openapi.json")

file_path = Path("./openapi.json")
openapi_content = data.json()

for path_data in openapi_content["paths"].values():
    for operation in path_data.values():
        tag = operation["tags"][0]
        operation_id = operation["operationId"]
        to_remove = f"{tag}-"
        new_operation_id = operation_id[len(to_remove) :]
        operation["operationId"] = new_operation_id

file_path.write_text(json.dumps(openapi_content))