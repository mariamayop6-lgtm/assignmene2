const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const USERS_FILE = path.join(__dirname, "users.json");

function getUsers() {
    if (!fs.existsSync(USERS_FILE)) return [];
    const data = fs.readFileSync(USERS_FILE, "utf8");
    return JSON.parse(data || "[]");
}

function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
}

const server = http.createServer((req, res) => {
    const { method, url } = req;
    
    res.setHeader("Content-Type", "application/json");

    if (method === "POST" && url === "/user") {
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", () => {
            const newUser = JSON.parse(body);
            const users = getUsers();

            const emailExists = users.some((u) => u.email === newUser.email);
            if (emailExists) {
                res.writeHead(400);
                return res.end(JSON.stringify({ message: "Email already exists." }));
            }

            newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
            users.push(newUser);
            saveUsers(users);

            res.writeHead(201);
            res.end(JSON.stringify({ message: "User added successfully." }));
        });
    }
    else if (method === "PATCH" && url.startsWith("/user/")) {
        const id = parseInt(url.split("/")[2]);
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", () => {
            const updates = JSON.parse(body);
            const users = getUsers();
            const userIndex = users.findIndex((u) => u.id === id);

            if (userIndex === -1) {
                res.writeHead(404);
                return res.end(JSON.stringify({ message: "User ID not found." }));
            }

            users[userIndex] = { ...users[userIndex], ...updates };
            saveUsers(users);

            res.writeHead(200);
            res.end(JSON.stringify({ message: "User age updated successfully." }));
        });
    }
    else if (method === "DELETE" && url.startsWith("/user/")) {
        const id = parseInt(url.split("/")[2]);
        const users = getUsers();
        const userIndex = users.findIndex((u) => u.id === id);

        if (userIndex === -1) {
            res.writeHead(404);
            return res.end(JSON.stringify({ message: "User ID not found." }));
        }

        users.splice(userIndex, 1);
        saveUsers(users);

        res.writeHead(200);
        res.end(JSON.stringify({ message: "User deleted successfully." }));
    }
    else if (method === "GET" && url === "/user") {
        const users = getUsers();
        res.writeHead(200);
        res.end(JSON.stringify(users));
    }
    else if (method === "GET" && url.startsWith("/user/")) {
        const id = parseInt(url.split("/")[2]);
        const users = getUsers();
        const user = users.find((u) => u.id === id);

        if (!user) {
            res.writeHead(404);
            return res.end(JSON.stringify({ message: "User not found." }));
        }

        res.writeHead(200);
        res.end(JSON.stringify(user));
    }
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});