# React Native Amplify User Pool with Social Login Example

## Features

* Cognito User Pool + Identity provider (Google & Facebook)
* Redirect to app's deep link

## Screenshots

![](https://user-images.githubusercontent.com/3055294/40524265-3e973d1e-600c-11e8-9396-06a00a92b0e6.gif)

### Bad UX

I think the UX is bad. The cognito user pool way on React Native choose to open a browser to let user verify then redirect to app,
but lots of users will not login their Facebook account in web browser (like Chrome), they use Facebook app instead.

## Auth flow

1. Touch login button then open URL of `/oauth2/authorize` to authorizing.
2. After login FB/Google & authorizing, the page will redirect to the Apps scheme url (**rnampexample://callback/**).
3. Retrieve the (**code**) in app after redirect from web browser
4. Using the **code** to exchange tokens (**id_token**, **access_token** and **refresh_token**) from **/oauth2/token**.

## Setting Steps

Please refer the [AWS Amplify](https://aws.github.io/aws-amplify/) official document.

1. `yarn add aws-amplify`
2. `yarn add aws-amplify-react-native`
3. `awsmobile init`
4. Create user pool at Cognito by ourselves
	1. required attributes: name, email
	2. Don't open MFA
	3. Create `App clients` (without `App client secret`)
	4. Set `Domain name`
	5. Set `Identity providers` (You can follow this [document](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-social.html#cognito-user-pools-social-idp-step-1))
5. In Mobile Hub, please add `User sign-in` section, and in `Create new or import`, please select `Import an existing user pool` then use the user pool we created above.
  (Notice: `To register an app with Facebook` in document seems has an typo here, in step 14, **Valid OAuth Redirect URIs** should be filled with the **/oauth2/idpresponse endpoint**.)
6. After 4 & 5, please run `awsmobile pull` to sync local settings
