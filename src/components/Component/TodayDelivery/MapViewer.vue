<template>
    <div>
        <vue-daum-map
        :appKey="appKey"
        :center.sync="center"
        :level.sync="level"
        :mapTypeId="mapTypeId"
        :libraries="libraries"
        @load="onLoad"
        @center_changed="onMapEvent('center_changed', $event)"
        @zoom_start="onMapEvent('zoom_start', $event)"
        @zoom_changed="onMapEvent('zoom_changed', $event)"
        @bounds_changed="onMapEvent('bounds_changed', $event)"
        @click="onMapEvent('click', $event)"
        @dblclick="onMapEvent('dblclick', $event)"
        @rightclick="onMapEvent('rightclick', $event)"
        @mousemove="onMapEvent('mousemove', $event)"
        @dragstart="onMapEvent('dragstart', $event)"
        @drag="onMapEvent('drag', $event)"
        @dragend="onMapEvent('dragend', $event)"
        @idle="onMapEvent('idle', $event)"
        @tilesloaded="onMapEvent('tilesloaded', $event)"
        @maptypeid_changed="onMapEvent('maptypeid_changed', $event)"
        style="width:411px;height:400px;">
        </vue-daum-map>
                <b-list-group flush style="overflow:scroll;height:680px;">
                <b-list-group-item v-for="(item, index) in this.store.state.orderHistory" :key="index">
                    <div>
                        <b-btn class="bg-transparent text-dark border-0 w-100" @click="reqCenter(index)">
                            <div style="width:75%;height:100%;float:left;text-align:left;font-weight:bold">
                                {{item.customerBname}}
                                <br>
                                <span style="width:65%;font-weight:normal;">{{item.address1 + item.address2}}</span>
                            </div>
                        </b-btn>
                    </div>
            </b-list-group-item>
                </b-list-group>
    </div>
</template>

<script>
    import VueDaumMap from 'vue-daum-map';
    import config from './config';
    export default {
        name: 'MapViewer',
        components: {
            VueDaumMap
        },
        data() {
            return{
                appKey: config.appKey,
                position: [],
                center: {lat:35.14967429988015, lng:129.00468461498266},
                level: 5,
                mapTypeId: VueDaumMap.MapTypeId.NORMAL,
                libraries: ['drawing', 'services', 'clusterer'],
                mapObject: null
            }
        },
        methods: {
            onLoad (map) {
                // 지도의 현재 영역을 얻어옵니다
                var bounds = map.getBounds();
                // 영역정보를 문자열로 얻어옵니다. ((남,서), (북,동)) 형식입니다
                var boundsStr = bounds.toString();
                console.log('Daum Map Loaded', boundsStr);
                var geocoder = new daum.maps.services.Geocoder();
                var position=[];
                for(var i=0; i < this.store.state.orderHistory.length; i++) {
                    var lot = this.store.state.orderHistory[i].address1 + " " + this.store.state.orderHistory[i].address2;
                    console.log(lot);
                    var addr=this.store.state.orderHistory[i].address3
                    geocoder.addressSearch(lot, function(result, status) {
                        // 정상적으로 검색이 완료됐으면 
                        if (status === daum.maps.services.Status.OK) {
                            position.push({title: addr, latlng: new daum.maps.LatLng(result[0].y, result[0].x)})
                        }
                    });
                }
                this.position = position;
                this.$forceUpdate();
                console.log(this.position);
                var imageSrc = "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 

                for (var i = 0; i < position.length; i++) {
                    // 마커 이미지의 이미지 크기 입니다
                    var imageSize = new daum.maps.Size(24, 35); 

                    // 마커 이미지를 생성합니다    
                    var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize); 

                    // 마커를 생성합니다
                    var marker = new daum.maps.Marker({
                        map: map, // 마커를 표시할 지도
                        position: position[i].latlng, // 마커를 표시할 위치
                        title : position[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                        image : markerImage // 마커 이미지 
                    });
                }
                this.mapObject = map;
            },
            onMapEvent (event, params) {
                console.log(`Daum Map Event(${event})`, params);
            },
            reqCenter(str){
                console.log(str);
                this.center = {lat: this.position[str].latlng.ib, lng: this.position[str].latlng.jb};
                console.log(this.center);
            }
        }
    }
</script>

<style scoped>

</style>