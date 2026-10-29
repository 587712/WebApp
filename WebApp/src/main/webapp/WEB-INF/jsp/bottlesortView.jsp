<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
	<!DOCTYPE html>
	<html>

	<head>
		<meta charset="UTF-8">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/styles/mainStyle.css">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/styles/bottlesortStyle.css">
		<title>Bottlesort</title>
	</head>

	<body>
		<h1>Bottlesort</h1>
		<button id="backBtn">Back to selection</button><button id="resetBtn">Reset</button>
		<main>
			<fieldset>
				<legend>Game</legend>
			</fieldset>
		</main>
		<script>const contextPath = `${pageContext.request.contextPath}`</script>
		<script src="${pageContext.request.contextPath}/scripts/bottlesortScript.js"
			defer>const contextPath = `${pageContext.request.contextPath}`</script>
		<script src="${pageContext.request.contextPath}/scripts/mainScript.js" defer></script>
	</body>

	</html>