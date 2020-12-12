export default function(context, inject){
    let isLoaded = false
    let waiting = []
    
    addScript()
    inject('maps', {
        showMap
    })


    function addScript(){
        const script = document.createElement('script')
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCsKXrZB1kSA-Xw4FqmqhDNNHhP__Homtw&libraries=places&callback=initGoogleMaps"
        script.async = true
        window.initGoogleMaps = initGoogleMaps
        document.head.appendChild(script)
    }

    function initGoogleMaps(){
        isLoaded =  true
        waiting.forEach((item) => {
            if(typeof item.fn === 'function'){
                item.fn(...item.arguments)
            }
        })
        waiting = []
    }

    function showMap(canvas, lat, lng){
        if(!isLoaded){
            waiting.push({
                fn: showMap,
                arguments,
            })
            return
        }
        const mapOptions = {
            zoom: 18,
            center: new window.google.maps.LatLng(lat, lng),
            disableDefaultUI: true,
            zoomControl: true,
        }
        const map = new window.google.maps.Map(canvas, mapOptions)
        const position = new window.google.maps.LatLng(lat, lng)
        const marker = new window.google.maps.Marker({ position })
        marker.setMap(map)
    }
}