// noinspection JSJQueryEfficiency,JSUnresolvedReference

function getKCHost() {
    let baseURL = "http://localhost/idp-auth";
    setTimeout(function () {
        kcAuth(baseURL);
    }, 2000);
}

function kcAuth(kcBaseURL) {
    const authURL = `${kcBaseURL}/idp-auth`;
    const keycloak = new Keycloak({
        "auth-server-url": authURL,
        url: kcBaseURL,
        realm: 'my-idp',
        clientId: 'my-idp-client',
        "enable-cors": true,
        "public-client": false,
    });

    keycloak.init({
        onLoad: 'check-sso',
        checkLoginIframe: false,
        promiseType: 'native',
        flow: 'implicit'
    }).then(isAuthenticated => {
        if (isAuthenticated) {
            console.log("Authenticated.");
            console.log(keycloak);
            window.keycloak = keycloak;
            $('#token').html(keycloak.token);
            $('.editor').show();
            $('.loader').hide();
        } else {
            window.location.href = 'http://localhost/idp-auth/realms/my-idp/protocol/saml/clients/sso?RelayState=hello';
        }
        // this.setState({keycloak: keycloak, authenticated: authenticated});
    }).catch(error => {
        console.error("Keycloak initialization error:", error);
    });
}

$(document).ready(function () {
    $("#sp-btn").on("click", function () {
        // window.location.href = `http://localhost/idp-auth/realms/my-idp/protocol/saml/clients/sso?RelayState=world`;
        window.location.href = 'http://localhost/sp'
    });
});

$(document).ready(function () {
    $("#btn-logout").on("click", function () {
        window.location.href = "http://localhost/idp-auth/realms/my-idp/protocol/openid-connect/logout";
    });
})