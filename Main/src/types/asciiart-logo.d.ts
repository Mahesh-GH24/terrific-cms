declare module 'asciiart-logo' {
    export default function config(options: {
        name?: string;
        font?: string;
        lineChars?: string;
        padding?: number;
        margin?: number;
        borderColor?: string;
        // add logoColor, textColor,
    }): any;

    export function render(options: LogoConfig): void;
}
