class WeatherAPI {
    private createUrl(
        endpoint: string,
        params: Record<string, string | number>
    ) {
        return `${endpoint}`;
    }

    private fetchData() {}

    async getCurrentWeather() {}

    async getForecast() {}

    async reverseGeocode() {}
}
