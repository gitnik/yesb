angular.module('ServerBrowserApp.filters', []).
filter('ServerNameColorFilter', function() {
    return function(server) {
        // strip the color codes from the server name
        return server.name.replace(
                /0x(([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})|RESETT|.{6})(.*?)(?=0x(?:.{6}|RESETT)|$)/g,
                function(sub, hex, r_, g_, b_, colored){
                    return '<a href="armagetronad://'+server.ip+':'+server.port+'"><font color="' + hex + '">' + colored + '</font></a>';
                });
    }
}).
filter('JoinPlayersFilter', function() {
    return function(playersArray) {
        var players = Array();
        playersArray.forEach(function(player) {
            var playerString = player.name;
            if(player.gid)
                playerString += " (" + player.gid + ")";

            players.push(playerString)

        });
        return players.join(', ');
    }
}).
filter('PlayersCountFilter', function() {
    return function(ServersArray) {
        if(!ServersArray)
            return;

        var numPlayers = 0;
        ServersArray.forEach(function(server) {
            numPlayers += server.Players.length;
        });

        return numPlayers;
    }
}).
filter('ServerLocationFilter', function() {
    return function(country) {
        invalidCountryCodes= new Array("xx", "00", "a1", "a2", "o1");
        if(invalidCountryCodes.indexOf(country) != "-1")
             return ""
        return '<img src="img/flags/'+country+'.png">';
    }
});