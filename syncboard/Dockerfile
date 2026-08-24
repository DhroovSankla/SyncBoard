# Stage 1: Build the JAR file
FROM eclipse-temurin:21-jdk-jammy AS build
WORKDIR /app

# Copy gradle files and project configuration
COPY gradle gradle
COPY gradlew gradlew
COPY settings.gradle.kts build.gradle.kts ./

# Fix potential Windows CRLF issues on gradlew file (very common on Windows environments)
RUN tr -d '\r' < gradlew > gradlew_unix && mv gradlew_unix gradlew && chmod +x gradlew

# Copy source code
COPY src src

# Build application jar
RUN ./gradlew bootJar --no-daemon

# Stage 2: Create runtime container
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
