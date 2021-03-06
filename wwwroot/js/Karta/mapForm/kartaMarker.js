(function(GoNorth) {
    "use strict";
    (function(Karta) {
        (function(Map) {

            /**
             * Karta Marker
             * 
             * @param {object} mapId Id of the karta map
             * @param {object} latLng Coordinates of the marker
             * @class
             */
            Map.KartaMarker = function(mapId, latLng) 
            {
                Map.BaseMarker.apply(this);

                this.mapId = mapId;

                this.isTrackingImplementationStatus = true;

                this.serializePropertyName = "MapChangeMarker";

                this.initMarker(latLng);
            }

            Map.KartaMarker.prototype = jQuery.extend({ }, Map.BaseMarker.prototype);

            /**
             * Returns the icon url
             * 
             * @return {string} Icon Url
             */
            Map.KartaMarker.prototype.getIconUrl = function() {
                return "/img/karta/kartaMarker.png";
            }

            /**
             * Returns the icon retina url
             * 
             * @return {string} Icon Retina Url
             */
            Map.KartaMarker.prototype.getIconRetinaUrl = function() {
                return "/img/karta/kartaMarker_2x.png";
            }

            /**
             * Loads the content
             * 
             * @returns {jQuery.Deferred} Deferred
             */
            Map.KartaMarker.prototype.loadContent = function() {
                var def = new jQuery.Deferred();

                var self = this;
                jQuery.ajax({
                    url: "/api/KartaApi/Map?id=" + this.mapId
                }).done(function(map) {
                    var mapHtml = "<h4><a href='#id=" + self.mapId + "'>" + map.name + "</a></h4>";

                    def.resolve(mapHtml);
                }).fail(function() {
                    def.reject();
                })

                return def.promise();
            }

            /**
             * Serializes the marker
             * 
             * @returns {object} Serialized data
             */
            Map.KartaMarker.prototype.serialize = function() {
                var serializedObject = this.serializeBaseData();
                serializedObject.mapId = this.mapId;
                return serializedObject;
            }

        }(Karta.Map = Karta.Map || {}));
    }(GoNorth.Karta = GoNorth.Karta || {}));
}(window.GoNorth = window.GoNorth || {}));