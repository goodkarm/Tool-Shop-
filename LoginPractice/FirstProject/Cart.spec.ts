import { test, expect } from './fixtures/index';


test('Add to Cart and Remove from Cart using Standard User', async ({ standardUserDashboard, screenshotHelper }) => {

    var cartCount = 0;
    
    await test.step('Verify that the products are displayed on the dashboard', async () => {
        await expect.soft(standardUserDashboard.page.locator('[data-test="inventory-item-description"]').first()).toBeVisible();
        await expect.soft(standardUserDashboard.page.locator('[data-test="inventory-item-description"]').nth(1)).toBeVisible();
        await expect.soft(standardUserDashboard.page.locator('[data-test="inventory-item-description"]').nth(2)).toBeVisible();
        await expect.soft(standardUserDashboard.page.locator('[data-test="inventory-item-description"]').nth(3)).toBeVisible();
        await expect.soft(standardUserDashboard.page.locator('[data-test="inventory-item-description"]').nth(4)).toBeVisible();
        await expect.soft(standardUserDashboard.page.locator('[data-test="inventory-item-description"]').nth(5)).toBeVisible();
    });

    await test.step('Add the first product to the cart', async () => {
        await standardUserDashboard.page.locator('[data-test="inventory-item-description"]').nth(1).getByRole('button', { name: 'Add to Cart' }).click();
        cartCount++;
    });
    await test.step('Verify that User can add more than one product to the cart', async () => {
        await standardUserDashboard.page.locator('[data-test="inventory-item-description"]').nth(2).getByRole('button', { name: 'Add to Cart' }).click();
        cartCount++;
        await screenshotHelper.capture('Products added to cart with cart counter at ' + cartCount);
    });
    await test.step('Verify that the shopping cart badge shows the correct number of items added', async () => {
        await expect.soft(standardUserDashboard.page.locator('.shopping_cart_badge')).toHaveText(cartCount.toString());
    }); 

    await test.step('Verify that items are correctly added to the cart', async () => {
        await standardUserDashboard.page.locator('[data-test="shopping-cart-link"]').click();
        await expect.soft(standardUserDashboard.page.locator('.cart_item')).toHaveCount(cartCount);
        await screenshotHelper.capture('Cart page shows correct list of items added to cart');
    });

    await test.step('Verify that clicking the remove button removes the item from the cart', async () => {
        await standardUserDashboard.page.locator('.cart_item').first().getByRole('button', { name: 'Remove' }).click();
        cartCount--;
        await screenshotHelper.capture('Product removed from cart with cart counter at ' + cartCount);
    });
    await test.step('Verify that the shopping cart badge updates correctly after removing an item', async () => {
        await expect.soft(standardUserDashboard.page.locator('.shopping_cart_badge')).toHaveText(cartCount.toString());
    });
    await test.step('Verify that the cart is empty after removing all items', async () => {
        await standardUserDashboard.page.locator('.cart_item').last().getByRole('button', { name: 'Remove' }).click();
        cartCount--;
        await expect.soft(standardUserDashboard.page.locator('.cart_item')).toHaveCount(0);
        await screenshotHelper.capture('All products removed from cart with cart counter at ' + cartCount);
    });
    await test.step('Verify that removed items can be added back to the cart', async () => {
        await standardUserDashboard.page.getByRole('button', { name: 'Continue Shopping' }).click();
        await screenshotHelper.capture('Removed items can be added back to the cart');
    });
});

test ('Add to Cart and Remove from Cart using Problem User', async ({ problemUserDashboard, screenshotHelper }) => {

    var cartCount = 0;
    
    await test.step('Verify that the products are displayed on the dashboard', async () => {
        await expect.soft(problemUserDashboard.page.locator('[data-test="inventory-item-description"]').first()).toBeVisible();
        await expect.soft(problemUserDashboard.page.locator('[data-test="inventory-item-description"]').nth(1)).toBeVisible();
        await expect.soft(problemUserDashboard.page.locator('[data-test="inventory-item-description"]').nth(2)).toBeVisible();
        await expect.soft(problemUserDashboard.page.locator('[data-test="inventory-item-description"]').nth(3)).toBeVisible();
        await expect.soft(problemUserDashboard.page.locator('[data-test="inventory-item-description"]').nth(4)).toBeVisible();
        await expect.soft(problemUserDashboard.page.locator('[data-test="inventory-item-description"]').nth(5)).toBeVisible();
    });

    await test.step('Add the first product to the cart', async () => {
        await problemUserDashboard.page.locator('[data-test="inventory-item-description"]').nth(1).getByRole('button', { name: 'Add to Cart' }).click();
        cartCount++;
        await screenshotHelper.capture('Products added to cart with cart counter at ' + cartCount);
    });
    await test.step('Verify that some items cannot be added to the cart', async () => {
        await problemUserDashboard.page.locator('[data-test="inventory-item-description"]').nth(2).getByRole('button', { name: 'Add to Cart' }).click();
        await expect.soft(cartCount).toBe(1); // Expecting cartCount to remain 1 since the second item cannot be added
        await screenshotHelper.capture('Products cannot be added to cart with cart counter at ' + cartCount);
    });
    await test.step('Verify that the shopping cart badge shows the correct number of items added', async () => {
        await expect.soft(problemUserDashboard.page.locator('.shopping_cart_badge')).toHaveText(cartCount.toString());
    }); 

    await test.step('Verify that items are correctly added to the cart', async () => {
        await problemUserDashboard.page.locator('[data-test="shopping-cart-link"]').click();
        await expect.soft(problemUserDashboard.page.locator('.cart_item')).toHaveCount(cartCount);
        await screenshotHelper.capture('Cart page shows correct list of items added to cart');
    });

    await test.step('Verify that clicking the remove button removes the item from the cart', async () => {
        await problemUserDashboard.page.locator('.cart_item').first().getByRole('button', { name: 'Remove' }).click();
        cartCount--;
        await screenshotHelper.capture('Product removed from cart with cart counter at ' + cartCount);
    });
    await test.step('Verify that the shopping cart badge updates correctly after removing an item', async () => {

        if (cartCount > 0) {
            await expect.soft(problemUserDashboard.page.locator('.shopping_cart_badge')).toHaveText(cartCount.toString());
        } else {
            await expect.soft(problemUserDashboard.page.locator('.shopping_cart_badge')).toHaveCount(0);
        }

    });
    
    await test.step('Verify that the cart is empty after removing all items', async () => {
        await expect.soft(problemUserDashboard.page.locator('.cart_item')).toHaveCount(0);
        await screenshotHelper.capture('All products removed from cart with cart counter at ' + cartCount);
    });
    await test.step('Verify that removed items can be added back to the cart', async () => {
        await problemUserDashboard.page.getByRole('button', { name: 'Continue Shopping' }).click();
        await screenshotHelper.capture('Removed items can be added back to the cart');
    });
});