"use client";

import { useState } from "react";

function Profile() {
	const [userStats, setUserStats] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");
	const [user, setUser] = useState({
		name: "Utilisateur",
		email: "utilisateur@example.com",
		joined: new Date().toLocaleDateString(),
	});
}

// Dans une application réelle, vous récupéreriez l'ID de l'utilisateur authentifié
