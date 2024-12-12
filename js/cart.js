// Xóa sản phẩm
function removeItem() {
    const productItem = event.target.closest('.product-item');
    productItem.remove();
    updateSubtotal();
}

document.addEventListener("DOMContentLoaded", () => {
    // Cập nhật total price cho mỗi sản phẩm
    const updateTotalPrice = (item) => {
        const quantityInput = item.querySelector(".number-input");
        const unitPrice = parseFloat(item.querySelector(".total-price").getAttribute("data-price"));
        const totalPriceElement = item.querySelector(".total-price");

        const quantity = parseInt(quantityInput.value) || 0;
        const totalPrice = (unitPrice * quantity).toFixed(2);

        totalPriceElement.textContent = `$${totalPrice}`;
    };

    // Cập nhật subtotal cho tổng giá
    const updateSubtotal = () => {
        let subtotal = 0;
        document.querySelectorAll(".product-item").forEach((item) => {
            const quantity = parseInt(item.querySelector(".number-input").value) || 0;
            const unitPrice = parseFloat(item.querySelector(".total-price").getAttribute("data-price"));
            subtotal += quantity * unitPrice;
        });

        document.querySelector(".Subtotal-price").textContent = `$${subtotal.toFixed(2)}`;
    };

    // gắn event listeners tới increment và decrement buttons
    document.querySelectorAll(".product-item").forEach((item) => {
        const decrementButton = item.querySelector(".decrement");
        const incrementButton = item.querySelector(".increment");
        const quantityInput = item.querySelector(".number-input");

        decrementButton.addEventListener("click", () => {
            let quantity = parseInt(quantityInput.value) || 0;
            quantity = Math.max(0, quantity - 1);
            quantityInput.value = quantity;
            updateTotalPrice(item);
            updateSubtotal();
        });

        incrementButton.addEventListener("click", () => {
            let quantity = parseInt(quantityInput.value) || 0;
            quantityInput.value = quantity + 1;
            updateTotalPrice(item);
            updateSubtotal();
        });

        // Cập nhật prices khi tùy chỉnh input
        quantityInput.addEventListener("input", () => {
            updateTotalPrice(item);
            updateSubtotal();
        });
    });

    // Initialize subtotal on page load
    updateSubtotal();
});
