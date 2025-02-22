import { render, screen, fireEvent } from "@testing-library/react";
import CsvHandler from "../components/CsvHandler";

describe("CSV Handler", () => {
    it("should trigger file input when import button is clicked", () => {
        render(<CsvHandler />);

        const input = screen.getByLabelText(/upload csv/i) as HTMLInputElement;
        expect(input).toBeInTheDocument();

        const file = new File(["date,amount,description,type"], "transactions.csv", { type: "text/csv" });
        fireEvent.change(input, { target: { files: [file] } });

        expect(input.files).not.toBeNull();
        expect(input.files!.length).toBe(1);
        expect(input.files![0].name).toBe("transactions.csv");
    });

    it("should allow exporting transactions to CSV", () => {
        render(<CsvHandler />);

        const link = document.createElement("a");
        jest.spyOn(document, "createElement").mockReturnValue(link);
        jest.spyOn(link, "click");

        fireEvent.click(screen.getByText(/export csv/i));

        expect(link.click).toHaveBeenCalled();
    });
});
