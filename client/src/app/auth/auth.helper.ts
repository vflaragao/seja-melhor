import { Account } from './auth.dto';

export function extractAccountFromToken(token: string): Account {
    if (!token) {
        return null;
    }
    const [_, payload, __] = token.split('.');
    const jsonAccount = window.atob(payload);
    return JSON.parse(jsonAccount) as Account;
}