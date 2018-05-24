# React Native Amplify User Pool with Social Login Example

## Steps

1. yarn add aws-amplify
2. yarn add aws-amplify-react-native
3. awsmobile init
4. Create user pool at Cognito by ourselves
	1. required attributes: name, email
	2. 	Don't open MFA
	3. Create `App clients` (without `App client secret`)
	4. Set `Domain name`
	5. Set `Identity providers` (You can follow this [document](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-social.html#cognito-user-pools-social-idp-step-1))
5. In Mobile Hub, please add `User sign-in` section, and in `Create new or import`, please select `Import an existing user pool` then use the user pool we created above.
6. After 4 & 5, please run `awsmobile pull` to sync local settings
