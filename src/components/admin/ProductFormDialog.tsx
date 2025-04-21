
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProductForm, ProductFormValues } from "./ProductForm";

type ProductFormDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ProductFormValues) => Promise<void>;
  initialValues: ProductFormValues;
  categories: string[];
  isSubmitting: boolean;
};

export const ProductFormDialog = ({
  isOpen,
  onOpenChange,
  onSubmit,
  initialValues,
  categories,
  isSubmitting,
}: ProductFormDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {initialValues.name ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>
        
        <ProductForm 
          initialValues={initialValues}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          categories={categories}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};
