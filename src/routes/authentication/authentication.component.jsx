import SignUpForm from '../../components/sign-up/sign-up.component'
import SignInForm from '../../components/sign-in-form/sign-in-form.component'
import { AuthenticationContainer } from './authentication.styles.js';

const Authentication = () => {


    return (
        <AuthenticationContainer>
            <SignInForm />
            <SignUpForm />
        </AuthenticationContainer>
    )
}

export default Authentication;