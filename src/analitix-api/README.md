# Analitix API
<p>

This microservice provides informations fetched from [Riot API](https://developer.riotgames.com/apis) hosted on MongoDB database.

</p>

---
<br>
<p>
    <b> Currently we support only <i>GET</i> method </b>
</p>
<br>

---
<br>

### ***List of available API endpoints:<br><br>***

### ***Test requests:***
<table>
    <thead>
        <th> # </th>
        <th> Request </th>
        <th> Purpose </th>
        <th> Variables </th>
    <thead>
    <tbody>
        <tr>
            <td>
                <b> t01 </b>
            </td>
            <td>  
                /test
            </td>
            <td>
                This request purpose is to check if API is up and running.
            </td>
            <td>
                -
            <td>
        </tr>
    </tbody>
</table>

---

<br>

---

<br>

### ***Get informations Requests:***
<table>
    <thead>
        <th> # </th>
        <th> Request </th>
        <th> Purpose </th>
        <th> Variables </th>
    <thead>
    <tbody>
        <tr>
            <td>
                <b> g01  </b>
            </td>
            <td>  
                /get/players/:id
            </td>
            <td>
                Getting player info by player ID.
                <br>
                <i>(ID is fetched to database from <b>u01</b> request response.)</i>
            </td>
            <td>
                <b>:id</b> - <i> Player Summoner ID </i> <br> 
            <td>
        </tr>
        <tr>
            <td>
                <b> g02 </b>
            </td>
            <td>  
                /get/players/rankeds/:id
            </td>
            <td>
                Getting player ranking data by player ID.
                <br>
                <i>(ID is fetched to database from <b>u01</b> request response.)</i>
            </td>
            <td>
                <b>:id</b> - <i> Player Summoner ID </i> <br> 
            <td>
        </tr> 
        <tr>
            <td>
                <b> g03 </b>
            </td>
            <td>  
                /get/players/masteries/:id
            </td>
            <td>
                Getting player masteries data by player ID.
                <br>
                <i>(ID is fetched to database from <b>u01</b> request response.)</i>
            </td>
            <td>
                <b>:id</b> - <i> Player Summoner ID </i> <br> 
            <td>
        </tr> 
        <tr>
            <td>
                <b> g04 </b>
            </td>
            <td>  
                /get/players/matches/:id/:number
            </td>
            <td>
                Getting player match history data by player ID and list number.
                <br>
                Match history list contains 10 matches.
                <br>
                <i>(ID is fetched to database from <b>u01</b> request response.)</i>
            </td>
            <td>
                <b>:id</b> - <i> Player Summoner ID </i> <br> 
                <b>:number</b> - <i> Match history list number </i> <br> 
            <td>
        </tr> 
         <tr>
            <td>
                <b> g05 </b>
            </td>
            <td>  
                /get/matches/:id
            </td>
            <td>
                Getting match informations by match ID.
                <br>
                <i>(ID is fetched to database from <b>u03</b> request response.)</i>
            </td>
            <td>
                <b>:id</b> - <i> Match ID </i> <br> 
            <td>
        </tr> 
    </tbody>
</table>

<br>

---

<br>

### ***Upload informations Requests:***
<table>
    <thead>
        <th> # </th>
        <th> Request </th>
        <th> Purpose </th>
        <th> Variables </th>
    <thead>
    <tbody>
        <tr>
            <td>
                <b> u01  </b>
            </td>
            <td>  
                /upload/player/:name/:region
            </td>
            <td>
                First request that has to initiate fetching player data to database.
                <br>
                Checks if player with specific name exist in region and uploads data to database if found.
            </td>
            <td>
                <b>:name</b> - <i> Player Summoner name </i> <br> 
                <b>:region</b> - <i> Player Summoner region listed below in Region table </i> <br> 
            <td>
        </tr>
        <tr>
            <td>
                <b> u02 </b>
            </td>
            <td>  
                /upload/all/:name/:region
            </td>
            <td>
                Uploads all user data to database.
            </td>
            <td>
                <b>:name</b> - <i> Player Summoner name </i> <br> 
                <b>:region</b> - <i> Player Summoner region listed below in Region table </i> <br>  
            <td>
        </tr> 
        <tr>
            <td>
                <b> u03 </b>
            </td>
            <td>  
                /upload/matches/:id/:region
            </td>
            <td>
                Uploads matches data for specific Summoner to database.
                <br>
                <i>(ID is fetched to database from <b>u01</b> request response.)</i>
                <br>
            </td>
            <td>
                <b>:id</b> - <i> Player Summoner ID </i> <br> 
                <b>:region</b> - <i> Player Summoner region listed below in Region table </i> <br> 
            <td>
        </tr> 
        <tr>
            <td>
                <b> u04 </b>
            </td>
            <td>  
                /upload/rankeds/:id/:region
            </td>
            <td>
                Uploads ranking data for specific Summoner to database.
                <br>
                <i>(ID is fetched to database from <b>u01</b> request response.)</i>
            </td>
            <td>
                <b>:id</b> - <i> Player Summoner ID </i> <br>  
                <b>:region</b> - <i> Player Summoner region listed below in Region table </i> <br>
            <td>
        </tr> 
         <tr>
            <td>
                <b> u05 </b>
            </td>
            <td>  
                /upload/masteries/:id/:region
            </td>
            <td>
                Uploads masteries data for specific Summoner to database.
                <br>
                <i>(ID is fetched to database from <b>u03</b> request response.)</i>
            </td>
            <td>
                <b>:id</b> - <i> Match ID </i> <br> 
                <b>:region</b> - <i> Player Summoner region listed below in Region table </i> <br>
            <td>
        </tr> 
    </tbody>
</table>

<br>

---

<br>

### ***Regions table:***
<table>
    <thead>
        <th>#</th>
        <th>Region</th>
        <th>Code</th>
    </thead>
    <tbody>
        <tr>   
            <td>
                1
            </td>
            <td>
                Europe
            </td>
            <td>
                EUN1
            </td>
        </tr>
        <tr>   
            <td>
                2
            </td>
            <td>
                Europe 
            </td>
            <td>
                EUW1
            </td>
        </tr>
        <tr>   
            <td>
                3
            </td>
            <td>
                Europe
            </td>
            <td>
                TR1
            </td>
        </tr>
        <tr>   
            <td>
                4
            </td>
            <td>
                Europe
            </td>
            <td>
                RU
            </td>
        </tr>
        <tr>   
            <td>
                5
            </td>
            <td>
                Americas
            </td>
            <td>
                BR1
            </td>
        </tr>
        <tr>   
            <td>
                6
            </td>
            <td>
                Americas
            </td>
            <td>
                LA1
            </td>
        </tr>
        <tr>   
            <td>
                7
            </td>
            <td>
                Americas
            </td>
            <td>
                LA2
            </td>
        </tr>
        <tr>   
            <td>
                8
            </td>
            <td>
                Americas
            </td>
            <td>
                NA1
            </td>
        </tr>
        <tr>   
            <td>
                9
            </td>
            <td>
                Asia
            </td>
            <td>
                JP1
            </td>
        </tr>
        <tr>   
            <td>
                10
            </td>
            <td>
                Asia
            </td>
            <td>
                KR
            </td>
        </tr>
        <tr>   
            <td>
                11
            </td>
            <td>
                Sea
            </td>
            <td>
                OC1
            </td>
        </tr>
    </tbody>
</table>