// noinspection JSJQueryEfficiency,JSUnresolvedReference

function getKCHost() {
    let baseURL = window.location.protocol + "//" + window.location.host;
    setTimeout(function () {
        baseURL = baseURL + '/sp-auth'
        kcAuth(baseURL);
    }, 2000)
}

function kcAuth(kcBaseURL) {
    const authURL = `${kcBaseURL}/sp-auth`;
    const keycloak = new Keycloak({
        "auth-server-url": authURL,
        url: kcBaseURL,
        realm: 'my-sp',
        clientId: 'my-sp-client',
        "enable-cors": true,
        "public-client": false,
    });
    keycloak.init({
        onLoad: 'login-required',
        checkLoginIframe: false,
        promiseType: 'native',
        flow: 'implicit'
    }).then(authenticated => {
        console.log("Authenticated.");
        console.log(keycloak);
        window.keycloak = keycloak;
        $('#token').html(keycloak.token);
        $('.editor').show();
        $('.loader').hide();
        // this.setState({keycloak: keycloak, authenticated: authenticated});
    }).catch(error => {
        console.error("Keycloak initialization error:", error);
    });
}

$(document).ready(function () {
    $("#idp-btn").on("click", function () {
        window.location.href = 'http://localhost/idp'
    });
});

$(document).ready(function () {
    $("#btn-logout").on("click", function () {
        window.location.href = "http://localhost/sp-auth/realms/my-sp/protocol/openid-connect/logout";
    });
});