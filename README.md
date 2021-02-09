# The goal
The goal of the Implementation phase is to make the design prepared during the previous phase alive.
This repository provides a basic template for the final product/website.
You are expected to make your own copy of this repository and submit the link via email by **22/2/2021 23:59**.

**The submission needs to satisfy the following requirements:**
- The visual strongly resembles the UI design from the previous stage
- The website is funcional and uses both available data sources

# Documentation of the repository
This repository contains:
- JS Scripts that load the data from the [Travel Matrix](https://migration.iom.int/sites/all/themes/fmp/pages/heatmap/matrix.php?d=2021-02-01) and the [Travel Map](https://www.iatatravelcentre.com/world.php) in the */scripts/* directory.
- HTML templates that load [jQuery] for functionality and [Bootstrap](https://www.w3schools.com/bootstrap/) for design in the */* directory
- JS Scripts that dynamically use the data to build a sample product in the */* directory
- CSS file that provide a basic styling alongside the [Bootstrap](https://www.w3schools.com/bootstrap/) in the */styles/* dircetory
- Copy of the data sources in the */data* sources to ensure smooth development (which can be later replaced by live data)

# Functionality of the template
**List of countries**
The repository uses the Alpha-2 [ISO3166](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) country codes to distinguish between countries (e.g. *Slovakia* is *SK*). You can use function `getNameFromISO2(country_code)` to get a full country name from the Alpha-2 code and `getISO3fromISO2(country_code)` to get the Alpha-3 code from the Alpha-2 code. You can also use the `country_codes` to get the full list of all countries (a good example is in the *menu.js* file).

**Loading the data**
Two data sources are available - [Travel Map](https://www.iatatravelcentre.com/world.php) and [Travel Matrix](https://migration.iom.int/sites/all/themes/fmp/pages/heatmap/matrix.php?d=2021-02-01).
You can load the data from Travel Map by a function `getCountryInfo(country_code)`, which returns an object with parameters *string* `restriction_level` and *string* `description`, e.g. `getCountryInfo("SK")` will return data about Slovakia.
You can load the data from Travel Matrix by a function `getCountryCombination(arrival_country_code, destination_country_code)`, which returns an object with the parameters *int* `level` and *array of strings* `restrictions`, e.g. `getCountryCombination(SK, US)` will return information about the travel from the USA to Slovakia.

**jQuery and Bootstrap**
[jQuery] and [Bootstrap](https://www.w3schools.com/bootstrap/) are very useful libraries that you should use to dynamically create the website content. In the provided example file `country.js`, you can see jQuery being used to dynamically fill in the country name into the header by `$("#countryname").text(getNameFromISO2(country_code));` and Bootstrap being used to display the different levels of restrictions by
```
  if(country_status.restriction_level == "Fully restrictive"){
    $("#countrydesc").addClass("alert-danger")
  } else if (country_status.restriction_level == "Partially restrictive"){
    $("#countrydesc").addClass("alert-warning")
  } else if (country_status.restriction_level == "Not restrictive"){
    $("#countrydesc").addClass("alert-success")
  } else {
    $("#countrydesc").addClass("alert-primary")
  }
```
where the `alert-danger` changes the visual of the page to be red and resemble danger.
