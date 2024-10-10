# WeatherApp

## Video Demo:
[Watch the video on YouTube](https://youtu.be/qxjOwF_HTTw)

## Setup Instructions

To run the application, follow these steps:

1. Install dependencies by running:
    ```bash
    npm install
    ```

2. Start the application on an Android emulator or device:
    ```bash
    npm run android
    ```

> **Note**: This application is configured to work exclusively on Android.

## Application Logic

When the app is launched for the first time, it prompts the user to grant permission to access geolocation.

- **If permission is granted**, the app retrieves the weather information based on the current location. This behavior is repeated on every subsequent launch, using the updated geolocation data.

- **If permission is denied**, the user can select a city from a predefined list to view the weather for that location.

The permission request will **only be shown twice**. If permission is denied both times, the user will need to enable it manually through the device settings to continue using the geolocation feature.
