# Step 1: Build the application using Maven
FROM maven:3.9.9-amazoncorretto-21-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml and dependencies first to leverage Docker caching
COPY /arn-backend/pom.xml .
RUN mvn dependency:go-offline -B

# Copy the rest of the application source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Step 2: Create a lightweight runtime image for the Spring Boot app
FROM openjdk:21-jdk-slim

# Set working directory
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose the application port (adjust if your application uses a different port)
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
