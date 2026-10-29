<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
	<%@ taglib uri="jakarta.tags.core" prefix="c" %>
		<!DOCTYPE html>
		<html>

		<head>
			<meta charset="UTF-8">
			<link rel="stylesheet" href="${pageContext.request.contextPath}/styles/mainStyle.css">
			<link rel="stylesheet" href="${pageContext.request.contextPath}/styles/lightsoutStyle.css">
			<title>Lightsout</title>
		</head>

		<body>
			<h1>Lights Out</h1>
			<button id="backBtn">Back to selection</button><button id="resetBtn">Reset</button>
			<main>
				<fieldset>
					<legend>Game</legend>
				</fieldset>
				<p id="response"> </p>
				<button type="button" id="nextLvl" style="margin: auto; content-align: center;" onclick="nextLevel()"
					disabled>Next level</button>
			</main>
			<script>const contextPath = `${pageContext.request.contextPath}`</script>
			<script src="${pageContext.request.contextPath}/scripts/lightsoutScript.js"
				defer>const contextPath = `${pageContext.request.contextPath}`</script>
			<script src="${pageContext.request.contextPath}/scripts/mainScript.js" defer></script>
		</body>

		</html>