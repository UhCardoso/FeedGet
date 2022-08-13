import { SubmitFeedBackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn();
const sendEmailSpy = jest.fn();

const submitFeedback = new SubmitFeedBackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendEmailSpy}
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'Bug',
            comment: 'wxample comment',
            screenshot: 'data:image/png;base64,fadsfasdfasdfasd'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendEmailSpy).toHaveBeenCalled();
    })

    it('should no able to submit feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'wxample comment',
            screenshot: 'data:image/png;base64,fadsfasdfasdfasd'
        })).rejects.toThrow();
    })

    it('should no able to submit feedback without comment', async () => {
        await expect(submitFeedback.execute({
            type: 'bu',
            comment: '',
            screenshot: 'data:image/png;base64,fadsfasdfasdfasd'
        })).rejects.toThrow();
    })

    it('should no able to submit feedback with an invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'bu',
            comment: 'sdfasdf',
            screenshot: 'ete.hpg'
        })).rejects.toThrow();
    })
})