<template>
<div class="card">
    <div class="name">{{name}}</div>
    <div class="coords">({{coords.lon}}, {{coords.lat}})</div>
    <div class="temp">{{main.temp}}°C</div>
    <div class="meta">
        <div>Feels like: {{main.feels_like}}°C</div>
        <div>Min: {{main.temp_min}}°C Max: {{main.temp_max}}°C</div>
        <div>Humidity: {{main.humidity}}%</div>
    </div>
</div>
</template>

<script>
export default {
    props: [
        'name',
        'coords',
        'weather',
        'main'
    ],
}
</script>

<style>
.card {
    background-color: #f5f5f5;
    border: 1px solid #CCC;
    border-radius: 5px;
    box-shadow: 0px 1px 1px #a7a7a7;
    display: inline-block;
    margin: 1rem;
    width: 25%;
    padding: 1rem;
}

.coords {
    font-size: 0.8rem;
    margin-top: 0rem;
}

.meta {
    font-size: 0.8rem;
}

.name {
    font-size: 1.3rem;
    font-weight: bold;
}

.temp {
    background-color: #dfedff;
    border-radius: 100%;
    display: flex;
    flex-direction: column;
    height: 5rem;
    justify-content: center;
    margin: 1rem auto;
    width: 5rem;
}
</style>