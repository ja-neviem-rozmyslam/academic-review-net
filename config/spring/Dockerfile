# Build Stage
FROM maven:3.9.9-amazoncorretto-21-alpine AS builder

WORKDIR /app

COPY /arn-backend/pom.xml . 
RUN mvn dependency:go-offline -B

COPY /arn-backend/src ./src
RUN mvn clean package -DskipTests

FROM openjdk:21-jdk-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    libfreetype6 \
    libfontconfig1 \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]