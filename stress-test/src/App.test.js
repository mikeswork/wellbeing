import { render, screen, getAllByRole } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import data from "./data/questions.json";

describe('Wellbeing Quiz Test', () => {
    test('Renders quiz correctly', () => {
        render(<App />);

        // screen.debug();

        const instructReg = new RegExp(data.instructions.slice(0, 5));
        const instructElement = screen.getByText(instructReg);
        
        expect(instructElement).toBeInTheDocument();

        const questions = screen.getAllByRole("listitem");
        
        expect(questions.length).toBe(data.questions.length);
    });

    test('Answers are displayed and interactable', async () => {
        render(<App />);
        
        const questions = screen.getAllByRole("radio");
        await userEvent.click(questions[0]);
        
        expect(questions[0]).toBeChecked();
    });

    test('Submit while incomplete, then complete and submit', async () => {
        render(<App />);

        const submit = screen.getByRole("button");

        await userEvent.click(submit);

        const questions = screen.getAllByRole("listitem");

        expect(questions[0]).toHaveStyle({color: 'red'});

        const litems = document.getElementsByTagName("li");
        let radios = [];

        for (const li of litems) {
            radios.push(getAllByRole(li, "radio")[0]);
        }

        radios.forEach(async r => {
            await userEvent.click(r)
        })

        expect(questions[0]).not.toHaveStyle({color: 'red'});
        
        expect(radios[0]).toBeChecked();

        await userEvent.click(submit);

        expect(radios[0]).not.toBeChecked();

        // screen.debug();
    })
})