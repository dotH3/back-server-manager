import * as bcryptjs from 'bcryptjs';
import generator from 'generate-password-ts';

interface GenerateAndHashPasswordOutput {
    hashPassword: string
    rawPassword: string
}

export const generateAndHashPassword = (): GenerateAndHashPasswordOutput => {
    const rawPassword = generator.generate({
        length: 15,
        numbers: true,
        excludeSimilarCharacters: true,
    });

    const salt = bcryptjs.genSaltSync();
    const hashPassword = bcryptjs.hashSync(rawPassword, salt);
    return { rawPassword, hashPassword }
}