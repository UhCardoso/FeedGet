import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedBackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedBackUseCase {
    constructor (
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter,
    ) { }

    async execute(request: SubmitFeedBackUseCaseRequest) {
        const {type, comment, screenshot} = request;

        if(!type){
            throw new Error("Type is required");
        }
        if(!comment){
            throw new Error("Comment is required");
        }

        if(screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error("Invalid screenshoot format");
        }

        await this.feedbacksRepository.create({
            type, 
            comment,
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject: "Novo Feedback",
            body: [
                `<div>`,
                `<p>Tipo do feedback ${type}</p>`,
                `<p>Comentario do feedback ${comment}</p>`,
                screenshot ? `<img src="${screenshot}"/>` : null,
                `</div>`
            ].join('\n')
        })
    }
}