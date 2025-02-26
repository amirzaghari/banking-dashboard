import { render, screen, fireEvent } from "@testing-library/react";
import ImportExportPage from "../../pages/ImportExportPage";

describe("ImportExportPage", () => {
    it("should trigger file upload when the upload button is clicked", () => {
        render(<ImportExportPage />);

        const fileInput = screen.getByTestId("file-input");
        const uploadButton = screen.getByText("Upload CSV");

        fireEvent.click(uploadButton);

        expect(fileInput).toBeInTheDocument();
    });

    it("should trigger export when the export button is clicked", () => {
        const mockHandleExport = jest.fn();
        jest.spyOn(require("../components/CsvHandler"), "default").mockImplementation(() => ({
            handleExport: mockHandleExport,
        }));

        render(<ImportExportPage />);

        const exportButton = screen.getByText("Export CSV");
        fireEvent.click(exportButton);

        expect(mockHandleExport).toHaveBeenCalled();
    });
});