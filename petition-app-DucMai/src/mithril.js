//Component for Create Petition List
var CreatePetition = {
    petition: {
        title: "",
        description: ""
    },

    submit: function() {
        return m.request({
            method: "POST",
            url: "api/endpoint", 
            body: CreatePetition.petition
        })
        .then(function(response) {
            
        })
        .catch(function(error) {
            
        });
    },

    view: function() {
        return m("form", {
                onsubmit: function(e) {
                    e.preventDefault();
                    CreatePetition.submit();
                }
            }, [
            m("label.label", "Name of Petition"),
            m("input.input[type=text]", {
                oninput: m.withAttr("value", function(value) { CreatePetition.petition.title = value; }),
                value: CreatePetition.petition.title
            }),
            m("label.label", "Description"),
            m("textarea.input", {
                oninput: m.withAttr("value", function(value) { CreatePetition.petition.description = value; }),
                value: CreatePetition.petition.description
            }),
            m("button.button[type=submit]", "Create")
        ]);
    }
};

m.mount(document.getElementById("petition-form"), CreatePetition);


//Component for Petition List
var PetitionList = {
    petitions: [],

    loadList: function() {
        return m.request({
            method: "GET",
            url: "api/petitions",
        })
        .then(function(result) {
            PetitionList.petitions = result;
        })
    },

    view: function() {
        return m("div", PetitionList.petitions.map(function(petition) {
            return m("div.petition-item", 
                m("h3", petition.title),
                m("p", petition.description)
            );
        }));
    }
};

m.mount(document.getElementById("petition-list"), PetitionList);
 
//Call function loadList when the page is downloaded
PetitionList.loadList();


//Component for Search Page
var SearchForm = {
    searchTerm: "",
    onsubmit: function(e) {
        e.preventDefault();
        SearchResult.loadResults(SearchForm.searchTerm);
    },

    view: function() {
        return m("form", { onsubmit: SearchForm.onsubmit },
            m("label.label", "Search Petitions"),
            m("input.input[type=text]", {
                oninput: m.withAttr("value", function(value) { SearchForm.searchTerm = value; }),
                value: SearchForm.searchTerm
            }),
            m("button.button[type=submit]", "Search")
        );
    }
};

var SearchResult = {
    list: [],
    loadResults: function(searchTerm) {
        // Thay thế URL với endpoint thực tế của bạn
        return m.request({
            method: "GET",
            url: "api/search-petitions",
            data: { query: searchTerm }
        })
        .then(function(result) {
            SearchResult.list = result;
        })
        .catch(function(e) {
            console.error(e);
        });
    },

    view: function() {
        return m("div", 
            SearchResult.list.map(function(petition) {
                return m("div.petition-item", 
                    m("h3", petition.title),
                );
            })
        );
    }
};

m.mount(document.getElementById("search-form"), SearchForm);
m.mount(document.getElementById("search-results"), SearchResult);


// Component for Top 100 Petitions
var TopPetitions = {
    list: [],
    loadList: function() {
        // Gọi API để lấy top 100 petitions
        return m.request({
            method: "GET",
            url: "api/top-petitions", // Thay đổi URL theo backend của bạn
            data: { limit: 100 }
        })
        .then(function(result) {
            TopPetitions.list = result;
        })
        .catch(function(e) {
            console.error(e);
        });
    },

    view: function() {
        return m("div", 
            TopPetitions.list.map(function(petition) {
                return m("div.petition-item", 
                    m("h3", petition.title),
                    m("p", petition.description),
                );
            })
        );
    }
};


m.mount(document.getElementById("top-petitions"), TopPetitions);

// Loading list of petition
TopPetitions.loadList();





// Component for Login page
var LoginPage = {
    oninit: function() {
        
    },

    onSignIn: function(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
    },

    view: function() {
        return m("div", [
            m("h1", "Tinypet - Login"),
            m("div.g-signin2", { "data-onsuccess": LoginPage.onSignIn }),
        ]);
    }
};

m.mount(document.body, LoginPage);

