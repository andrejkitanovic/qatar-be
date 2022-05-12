import nodeMailjet from 'node-mailjet';

const mailjet = nodeMailjet.connect(process.env.MJ_APIKEY_PUBLIC ?? '76d1a9db60540f182664182760377c5b', process.env.MJ_APIKEY_PRIVATE ?? '2d6d793a30bb9d9f5409c24ba50eee36');
const From = {
	Email: 'NoReply@qfalumnirenuionevent.com',
	Name: 'Digital Business Card',
};
const SubjectPrefix = 'Digital Business Card';

export const sendEmailAccountCreated = async ({ email, name }: { email: string; name: string }) => {
	try {
		const { body: result } = await mailjet.post('send', { version: 'v3.1' }).request({
			Messages: [
				{
					From,
					To: [
						{
							Email: email,
						},
					],
					Subject: `${SubjectPrefix}`,
					HTMLPart: `
					<h1>YOUR ACCOUNT WAS CREATED 
					SUCCESSFULLY</h1>
					</br>
					<p>Hello ${name},
					You have successfully created a Digital Business Card account.</p>
					</br>
					<p>Please click <a href="https://qfalumnireunionevent.com/login">here</a> to log in and start managing your profile.</p>
					</br>
					<p>Thank you for using Digital Business Card.</p>
					`,
				},
			],
		});

		return true;
	} catch (err) {
		throw new Error();
	}
};

export const sendEmailResetPassword = async ({ email }: { email: string }) => {
	try {
		const { body: result } = await mailjet.post('send', { version: 'v3.1' }).request({
			Messages: [
				{
					From,
					To: [
						{
							Email: email,
						},
					],
					Subject: `${SubjectPrefix}`,
					HTMLPart: `
					<h1>PASSWORD RESET</h1>
					</br>
					<p>You have requested to reset your password. 
                    Your one-time passcode is <OTP>. 
                    Please use this passcode to complete your 
                    password reset.</p>
					</br>
                    <p>The code will expire in 15 minutes.</p>
                    </br>
					<p>If you did not make this request, 
                    please disregard this email.</p>
					</br>
					<p>Thank you for using Digital Business Card.</p>
					`,
				},
			],
		});

		return true;
	} catch (err) {
		throw new Error();
	}
};

export const sendEmailPasswordChanged = async ({ email }: { email: string }) => {
	try {
		const { body: result } = await mailjet.post('send', { version: 'v3.1' }).request({
			Messages: [
				{
					From,
					To: [
						{
							Email: email,
						},
					],
					Subject: `${SubjectPrefix}`,
					HTMLPart: `
					<h1>YOUR PASSWORD HAS BEEN CHANGED</h1>
					</br>
					<p>You have successfully updated your 
                    Digital Business Card account password. 
                    Click <a href="https://qfalumnireunionevent.com/login">here</a>
                    to login with your new password.</p>
					</br>
					<p>If you did not make this request, please
                    immediately send us an email to
                    support@qfalumnireunionevent.com.</p>
					</br>
					<p>Thank you for using Digital Business Card.</p>
					`,
				},
			],
		});

		return true;
	} catch (err) {
		throw new Error();
	}
};
