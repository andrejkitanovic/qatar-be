import nodeMailjet from 'node-mailjet';

const mailjet = nodeMailjet.connect(process.env.MJ_APIKEY_PUBLIC ?? '', process.env.MJ_APIKEY_PRIVATE ?? '');
const From = {
	Email: 'kitanovicandrej213@gmail.com',
	Name: 'Destilery CRM',
};
const SubjectPrefix = 'Destilery |';

export const sendEmailInvitation = async ({ organisation, email }: { organisation: string; email: string }) => {
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
					Subject: `${SubjectPrefix} User Invitation`,
					// HTMLPart: reviewEmail(organisation),
				},
			],
		});

		return true;
	} catch (err) {
		throw new Error();
	}
};
