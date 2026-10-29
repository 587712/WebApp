<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
	<!DOCTYPE html>
	<html>

	<head>
		<meta charset="UTF-8">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/styles/mainStyle.css">
		<title>Home</title>
	</head>

	<body>
		<h1>List of games</h1>
		<main>
			<fieldset>
				<legend>Games</legend>
				<button id="lightsoutBtn">LightsOut</button>
				<button id="mastermindBtn">Mastermind</button>
				<button id="bottlesortBtn">Bottlesort</button>
			</fieldset>
		</main>
		<script>const contextPath = `${pageContext.request.contextPath}`</script>
		<script src="${pageContext.request.contextPath}/scripts/indexScript.js"
			defer>const contextPath = `${pageContext.request.contextPath}`</script>
	</body>

	</html>