// Helper function that converts the ISO2 country code into ISO3 country code
var getISO3FromISO2 = function(country_code){
    for(var key in country_codes){
        if(country_codes[key]["country_iso_2_char_code"] == country_code){
            return country_codes[key]["country_iso_3_char_code"]
        }
    }
}

// Helper function that converts the ISO2 country code into the country name
var getNameFromISO2 = function(country_code){
    for(var key in country_codes){
        if(country_codes[key]["country_iso_2_char_code"] == country_code){
            return country_codes[key]["country"]
        }
    }
}

// Returns the data about the general restrictions imposed on a country
var getCountryInfo = function(country_code){
    
    // Create return object
    var country_obj = {}

    // Check if the country exists
    if(svgMapDataGPD && svgMapDataGPD["values"] && svgMapDataGPD["values"][country_code]){
        
        // Load the restriction code
        var restriction_code = svgMapDataGPD["values"][country_code]["gdpAdjusted"]

        // Translate the restriction code into textual description of the restriction
        if(restriction_code == 1){
            country_obj["restriction_level"] = "Partially restrictive"
        } else if(restriction_code == 2){
            country_obj["restriction_level"] = "Fully restrictive"
        } else if(restriction_code == 3){
            country_obj["restriction_level"] = "Not restrictive"
        }

        // Add the textual description of the situation
        country_obj["description"] = svgMapDataGPD["values"][country_code]["gdp"]
    }
    return country_obj
}

// Returns the data about current restrictions imposed when travelling from one country (destination) to another (arrival)
// Uses the Data from the COVID Travel Matrix
var getCountryCombination = function(arrival_country_code, destination_country_code){

    // Textual description of the restriction IDs
    var restrctionTypes = {     0: "No official restriction reported",     1: "Passengers arriving from or having been to the country are not allowed to enter, without time parameter",     2: "Passengers arriving from or having been to the country in the last 28 days are not allowed to enter",     3: "Passengers arriving from or having been to the country in the last 14 days are not allowed to enter",     4: "Passengers arriving from or having been to the country in the last 20 days are not allowed to enter",     5: "Passengers arriving from or having been to the country in the last 30 days are not allowed to enter",     6: "Passengers arriving from or having been to the country since beginning of 2020 are not allowed to enter",     10: "Change in visa requirements, nationals from country now require visa",     11: "Change in visa requirements, visiting foreigners previously in these countries now require visa",     12: "Change in visa requirements, all passengers arriving from these countries now require visa",     13: "Change in visa requirements, nationals from country have previously issued visas invalidated",     15: "Nationals from these countries not allowed to enter, without time parameter",     16: "Change in movement agreement, ID card no longer enough, passport now required",     20: "Medical measures, quarantine of 14 days prior or after entering the country",     21: "Medical measures, other forms of screening and monitoring upon arrival",     22: "Medical measures, medical certificate required ",     24: "Quarantine of 14 days in country with no confirmed cases required and medical certificate required",     25: "Medical measures, other type of medical restrictions and measures (not different from 21)",     30: "Other type of limitations but not total restriction" , 99: "No restrictions"    };

    // Convert the country codes to the ISO 3 format used by the source
    var iso3_arrival_country_code = getISO3FromISO2(arrival_country_code)
    var iso3_destination_country_code = getISO3FromISO2(destination_country_code)

    // Load the information about the arrival country
    var country_status = RestrictionMatrix[iso3_arrival_country_code];

    // Return if country is not in the list
    if(!country_status) return;

    // Find the destination country in the list
    var destination = RestrictionMatrix["ARRIVAL_ISO3"].indexOf(iso3_destination_country_code);
    
    // Return if country is not in the list
    if(destination < 0) return;

    // Load the country object
    var restrictions_raw = country_status[destination];

    // Query the individual restriction IDs
    var temp = restrictions_raw.split("-");
    var restriction_level = temp[0];
    var restriction_list = JSON.parse("[" + temp[1] + "]");

    // Build the result object
    var result = {
        "level": restriction_level,
        "restrictions": []
    }

    // Convert the restriction IDs ito restriction descriptions
    for(var key in restriction_list){
        console.log(restriction_list[key])
        if(restrctionTypes[restriction_list[key]]){
            result["restrictions"].push(restrctionTypes[restriction_list[key]])
        }
    }
    return result;
}