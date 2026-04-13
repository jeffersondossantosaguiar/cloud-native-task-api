# ☁️ Cloud-Native Task API

> A production-grade REST API built with Node.js and TypeScript, deployed on Kubernetes — built as a hands-on learning project to develop real-world cloud-native skills.

---

## 📌 About This Project

This project was designed to bridge the gap between knowing how to build APIs and knowing how to **ship them in a production-like environment**. Rather than following a tutorial, I built this step by step — understanding each Kubernetes concept before applying it.

The goal: become comfortable with the full lifecycle of a cloud-native application, from writing code to deploying and scaling it on Kubernetes.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Kubernetes Cluster                  │
│                                                     │
│  ┌──────────┐    ┌──────────────┐   ┌────────────┐  │
│  │  Ingress │───▶│  Task API    │──▶│ PostgreSQL  │  │
│  │  (nginx) │    │  (Node.js)   │   │(StatefulSet)│  │
│  └──────────┘    └──────────────┘   └────────────┘  │
│                         │                           │
│                   ┌─────▼──────┐                    │
│                   │   Redis    │                    │
│                   │  (cache)   │                    │
│                   └────────────┘                    │
└─────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer             | Technology                       |
| ----------------- | -------------------------------- |
| Runtime           | Node.js + TypeScript             |
| Framework         | Express                          |
| Database          | PostgreSQL                       |
| Cache             | Redis                            |
| Container Runtime | Docker                           |
| Orchestration     | Kubernetes (kind for local)      |
| Package Manager   | Helm                             |
| CI/CD             | GitHub Actions                   |
| Registry          | GitHub Container Registry (GHCR) |

---

## ⚙️ Kubernetes Concepts Covered

- `Deployment` — running and updating the API
- `StatefulSet` — running PostgreSQL with stable storage
- `Service` — internal communication between components
- `Ingress` — exposing the API externally via nginx
- `ConfigMap` — non-sensitive environment configuration
- `Secret` — database credentials and sensitive config
- `PersistentVolume` / `PersistentVolumeClaim` — data persistence
- `HorizontalPodAutoscaler` — CPU-based auto-scaling
- `Liveness` / `Readiness` Probes — health checking
- `ResourceRequests` / `Limits` — resource management
- `PodDisruptionBudget` — availability during disruptions
- `Helm` — packaging and deploying to different environments

---

## 📋 API Endpoints

```
POST   /tasks          Create a new task
GET    /tasks          List all tasks
GET    /tasks/:id      Get a task by ID
PATCH  /tasks/:id      Partially update a task
DELETE /tasks/:id      Delete a task

GET    /healthz        Liveness probe (is the process alive?)
GET    /readyz         Readiness probe (is the app ready to serve traffic?)
```

---

## 🚀 Running Locally

### Prerequisites

- Docker
- kubectl
- kind
- Helm

### 1. Create the local cluster

```bash
kind create cluster --name task-api
```

### 2. Clone and enter the repository

```bash
git clone https://github.com/your-username/cloud-native-task-api
cd cloud-native-task-api
```

### 3. Deploy with Helm

```bash
helm install task-api ./helm/task-api
```

### 4. Check everything is running

```bash
kubectl get pods
kubectl get services
```

### 5. Access the API

```bash
curl http://localhost/tasks
```

---

## 📁 Project Structure

```
cloud-native-task-api/
├── .github/
│   └── workflows/
│       ├── ci.yml           # Build, lint, push image
│       └── cd.yml           # Deploy via Helm
├── k8s/
│   ├── base/                # API manifests
│   ├── postgres/            # Database manifests
│   └── redis/               # Cache manifests
├── helm/
│   └── task-api/            # Helm chart
├── src/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── index.ts
├── Dockerfile
├── docker-compose.yml       # Local dev without K8s
└── PROJECT_CONTEXT.md       # Learning roadmap and decisions
```

---

## 🗺️ Learning Roadmap

- [x] **Phase 0** — Environment setup (Docker, kubectl, kind, Helm)
- [ ] **Phase 1** — Node.js API with TypeScript + Dockerfile
- [ ] **Phase 2** — Core Kubernetes (Deployment, Service, ConfigMap, Secret, Ingress, StatefulSet)
- [ ] **Phase 3** — Production practices (HPA, Probes, Limits, Helm chart, Redis)
- [ ] **Phase 4** — CI/CD with GitHub Actions

---

## 💡 Key Decisions & Lessons Learned

> This section is updated as the project evolves — documenting not just _what_ was built, but _why_ each decision was made.

**Why `kind` instead of minikube?**
kind runs Kubernetes nodes as Docker containers, making it lightweight and closer to how clusters work in CI environments like GitHub Actions.

**Why `StatefulSet` for PostgreSQL instead of `Deployment`?**
StatefulSets provide stable network identities and ordered pod management — essential for databases that need consistent storage and controlled restarts.

**Why separate `liveness` and `readiness` probes?**
Liveness tells Kubernetes whether to restart a pod (process crashed or deadlocked). Readiness tells Kubernetes whether to send traffic to it (dependencies like the database may not be ready yet). Using both prevents traffic from hitting a pod before it's truly ready.

---

## 📄 License

MIT

---

_Built with curiosity and a lot of `kubectl describe pod` 🔍_
