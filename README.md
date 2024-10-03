# Keycloak SAML-based SSO Configuration Example

## This example covers 2 kinds of SAML-based SSO flows

- IdP Initiated Flow
- Service Provider Initiated Flow

## IdP Initiated Flow

In the **IdP Initiated Flow**, the process begins at the Identity Provider (IdP). This flow is typically used when a
user wants to access a service without having to navigate to the Service Provider (SP) first. Here's how it works:

1. **User Access**: The user navigates directly to the IdP and authenticates. This can be done via a login page or a
   dashboard.
2. **SAML Assertion Generation**: Once authenticated, the IdP generates a SAML assertion containing information about
   the user and their authentication status.
3. **Redirection to SP**: The IdP redirects the user to the SP's assertion consumer service URL. This redirection
   includes the SAML assertion, which is typically transmitted via an HTTP POST request.
4. **Assertion Validation**: The SP receives the assertion and validates it to ensure it is genuine and has not been
   tampered with. This usually involves checking the signature and the issuer.
5. **User Access Granted**: Upon successful validation, the SP grants access to the user, allowing them to use the
   service.

### Benefits

- **User Experience**: Simplifies the login process for users who often access the IdP directly.
- **Centralized Authentication**: Allows for centralized management of user identities and access controls.

## Service Provider Initiated Flow

In the **Service Provider Initiated Flow**, the user begins at the Service Provider (SP) and is redirected to the
Identity Provider (IdP) for authentication. This flow is common when users are accessing a service that requires them to
log in. Here's how it works:

1. **User Access**: The user navigates to the SP and tries to access a protected resource.
2. **Redirection to IdP**: The SP detects that the user is not authenticated and redirects them to the IdP's login page.
   This redirection often includes a SAML request that specifies the SP's details and the requested resource.
3. **User Authentication**: The user enters their credentials on the IdP's login page. Upon successful authentication,
   the IdP generates a SAML assertion.
4. **Redirection Back to SP**: The IdP redirects the user back to the SP's assertion consumer service URL, including the
   SAML assertion in the response.
5. **Assertion Validation**: The SP receives and validates the SAML assertion, ensuring that it is legitimate.
6. **Access Granted**: If the assertion is valid, the user is granted access to the requested resource on the SP.

### Benefits

- **User Convenience**: Users can start at the SP, which is often more intuitive for accessing specific applications.
- **Security**: Ensures that the user is authenticated before accessing sensitive information or services.

Both flows facilitate Single Sign-On (SSO), allowing users to access multiple services without repeatedly entering
credentials, enhancing both user experience and security.

## Check the IdP and SP auth server configurations

### IDP Keycloak

- Open http://localhost/idp-auth
- U: `admin`, P: `admin`
- Select 'my-idp' realm

### SP Keycloak

- Open http://localhost/sp-auth
- U: `admin`, P: `admin`
- Select 'my-sp' realm

## Run the full setup

```shell
./start.sh
```

### Single Sign-on from IdP

- Open http://localhost/idp
- Click 'Open SP App'
- U: `test`, P: `test`
- Click Sign in
- You are now logged into both apps

### Single Sign-on from SP

- Open http://localhost/sp
- Click on 'SSO with IdP via SAML'
- U: `test`, P: `test`
- Click Sign in
- You are now logged into both apps

### Single Sign-out from SP

- Open http://localhost/sp
- Click logout
- You should be logged out from both IdP and SP

### Single Sign-out from IdP

- Open http://localhost/idp
- Click logout
- You should be logged out from both IdP and SP

## Improvements

- Redirections to specific URLs using `RelayState`
- Mapping custom attributes from IdP into SP (for example, IdP could pass a `tenant-id` as a custom param to SP and the SP user needs to get mapped into the specified tenant ID)
