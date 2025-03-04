# dwk NATS Broadcaster
A Node.js service that subscribes to NATS messages on the "todo_status" subject and forwards them to a Discord webhook. Used mainly for testing the dwk-todo application.

## CI/CD Pipeline
This project uses GitHub Actions to build the image, and then push it to Docker Hub. The workflow then uses the commit hash to update the manifest files, which ArgoCD can then sync the deployment with. The manifest files for this project can be found in this [link](https://github.com/HamzaWahed/dwk-todo-manifests). 
