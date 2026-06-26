import { test, expect } from './fixtures/index';


test('Dashboard using Standard_User Access', async ({standardUserDashboard , screenshotHelper}) => {

    await test.step('Verify that user is directed to Swag Labs inventory page', async () => {
        await expect.soft(standardUserDashboard.page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await screenshotHelper.captureFullPage('User directed to inventory page');
    });
    await test.step('Verify that the burger menu is displayed on the upper-left of the dashboard', async () => {
        await expect.soft(standardUserDashboard.burgerMenu).toBeVisible();
    });

    await test.step('Verify that the shopping cart is visible on the upper-right corner of the dashboard', async () => {
        await expect.soft(standardUserDashboard.shoppingCart).toBeVisible();
    });
    await test.step('Verify that the inventory page is displayed successfully.', async () => {
        await expect.soft(standardUserDashboard.productsList).toBeVisible();
    });

    await test.step('Verify that the filter dropdown is visible on the dashboard', async () => {
        await expect.soft(standardUserDashboard.filterDropdown).toBeVisible();
        await standardUserDashboard.filterDropdown.click();
        await screenshotHelper.capture('Filter dropdown options');
    
        const expectedOptions = [
        'Name (A to Z)',
        'Name (Z to A)',
        'Price (low to high)',
        'Price (high to low)',
    ];
        const actualOptions = await standardUserDashboard.filterDropdownOptions.allTextContents();
        expect.soft(actualOptions).toEqual(expectedOptions);
});

    await test.step('Verify that the products are displayed on the dashboard', async () => {
        await expect.soft(standardUserDashboard.page.locator('[data-test="inventory-item-description"]').first()).toBeVisible();
        await expect.soft(standardUserDashboard.page.locator('[data-test="inventory-item-description"]').nth(1)).toBeVisible();
        await expect.soft(standardUserDashboard.page.locator('[data-test="inventory-item-description"]').nth(2)).toBeVisible();
        await expect.soft(standardUserDashboard.page.locator('[data-test="inventory-item-description"]').nth(3)).toBeVisible();
        await expect.soft(standardUserDashboard.page.locator('[data-test="inventory-item-description"]').nth(4)).toBeVisible();
        await expect.soft(standardUserDashboard.page.locator('[data-test="inventory-item-description"]').nth(5)).toBeVisible();
    });
    
    await test.step('Verify that the product images are displayed correctly', async () => {
        for (const [i, expected] of standardUserDashboard.expectedProductImages.entries()) {
        await expect.soft(standardUserDashboard.productImages.nth(i)).toHaveAttribute('src', expected.src);
        await expect.soft(standardUserDashboard.productImages.nth(i)).toHaveAttribute('alt', expected.alt);
        await screenshotHelper.capture(`Product image ${i + 1} displayed correctly`);
    }
});
});
test ('Dashboard using Locked_Out_User Access', async ({lockedOutUserDashboard, screenshotHelper}) => {
    await test.step('Verify that user cannot login', async () => {
        await expect(lockedOutUserDashboard.errorMessage).toBeVisible();
        await expect(lockedOutUserDashboard.productsList).not.toBeVisible();
        await screenshotHelper.capture('Locked out user error message');
    });
});

test('Dashboard using Problem_User Access', async ({problemUserDashboard, screenshotHelper}) => {
    await test.step('Verify that user is directed to Swag Labs inventory page', async () => {
        await expect.soft(problemUserDashboard.page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await screenshotHelper.capture('User directed to inventory page');
    });
    await test.step('Verify that burger menu is displayed on the upper-left of the dashboard', async () => {
        await expect.soft(problemUserDashboard.burgerMenu).toBeVisible();
    });
    await test.step('Verify that the shopping cart is visible on the upper-right corner of the dashboard', async () => {
        await expect.soft(problemUserDashboard.shoppingCart).toBeVisible()
    });
    await test.step('Verify that the filter dropdown is visible on the dashboard', async () => {
        await expect.soft(problemUserDashboard.filterDropdown).toBeVisible();
        await problemUserDashboard.filterDropdown.click();
        await screenshotHelper.capture('Filter dropdown options');
    
        const expectedOptions = [
        'Name (A to Z)',
        'Name (Z to A)',
        'Price (low to high)',
        'Price (high to low)',
    ];
        const actualOptions = await problemUserDashboard.filterDropdownOptions.allTextContents();
        expect.soft(actualOptions).toEqual(expectedOptions);
});
    await test.step('Verify that the inventory page is displayed successfully.', async () => {
        await expect.soft(problemUserDashboard.productsList).toBeVisible();
    });
    await test.step('Verify that the product images are broken', async () => {
        for (const [i, expected] of problemUserDashboard.expectedProductImages.entries()) {
        await expect.soft(problemUserDashboard.productImages.nth(i)).not.toHaveAttribute('src', expected.src);
        await expect.soft(problemUserDashboard.productImages.nth(i)).toHaveAttribute('alt', expected.alt);
    }

    });
});





// test ('Dashboard using Visual_User Access', async ({visualUserDashboard, screenshotHelper}) => {
//     await test.step('Verify that user is directed to Swag Labs inventory page', async () => {
//         await expect.soft(visualUserDashboard.page).toHaveURL('https://www.saucedemo.com/inventory.html');
//         await screenshotHelper.capture('User directed to inventory page');
//     });
//     await test.step('Verify that burger menu is displayed on the upper-left of the dashboard', async () => {
//         await expect.soft(visualUserDashboard.burgerMenu).toBeVisible();
//     });
//     await test.step('Verify that the shopping cart is visible on the upper-right corner of the dashboard', async () => {
//         await expect.soft(visualUserDashboard.shoppingCart).toBeVisible()
//     });
//     await test.step('Verify that the filter dropdown is visible on the dashboard', async () => {
//         await expect.soft(visualUserDashboard.filterDropdown).toBeVisible();
//         await expect.soft(visualUserDashboard.filterDropdown).toContainText([
//             'Name (A to Z)',
//             'Name (Z to A)',
//             'Price (low to high)',
//             'Price (high to low)',
//         ]);
//     });
//     await test.step('Verify that the inventory page is displayed successfully.', async () => {
//         await expect.soft(visualUserDashboard.productsList).toBeVisible();
//     });
//     await test.step('Verify that the product images are displayed correctly', async () => {
//         await expect.soft(visualUserDashboard.page.locator('.inventory_item_img img').first()).toHaveAttribute('src', 'https://www.saucedemo.com/static/media/sauce-backpack-1200x1500.34e7aa42.jpg');
//         await expect.soft(visualUserDashboard.page.locator('.inventory_item_img img').nth(1)).toHaveAttribute('src', 'https://www.saucedemo.com/static/media/sauce-bike-light-1200x1500.a0c9caae.jpg');
//         await expect.soft(visualUserDashboard.page.locator('.inventory_item_img img').nth(2)).toHaveAttribute('src', 'https://www.saucedemo.com/static/media/sauce-bolt-1200x1500.c0dae290.jpg');
//         await expect.soft(visualUserDashboard.page.locator('.inventory_item_img img').nth(3)).toHaveAttribute('src', 'https://www.saucedemo.com/static/media/sauce-onesie-1200x1500.1b15e1fa.jpg');
//         await expect.soft(visualUserDashboard.page.locator('.inventory_item_img img').nth(4)).toHaveAttribute('src', 'https://www.saucedemo.com/static/media/sauce-shirt-1200x1500.1cddd8c2.jpg');
//         await expect.soft(visualUserDashboard.page.locator('.inventory_item_img img').nth(5)).toHaveAttribute('src', 'https://www.saucedemo.com/static/media/sauce-tap-1200x1500.3fa0b6ec.jpg');
//     });
// });


      

// test('Dashboard using Problem User', async ({ problemUserDashboard }, screenshotHelper) => {


//     await test.step('Login with problem user', async () => {
//         await expect.soft(problemUserDashboard.page).toHaveURL('https://www.saucedemo.com/inventory.html');
//         await screenshotHelper.capture('User directed to inventory page');
//     });
//     await test.step('Verify that the burger menu is displayed on the upper-left of the dashboard', async () => {
//         await expect.soft(problemUserDashboard.burgerMenu).toBeVisible();
//     });

//     await test.step('Verify that the shopping cart is visible on the upper-right corner of the dashboard', async () => {
//         await expect.soft(problemUserDashboard.shoppingCart).toBeVisible();
//     });
//     await test.step('Verify that the inventory page is displayed successfully.', async () => {
//         await expect.soft(problemUserDashboard.productsList).toBeVisible();
//     });

//     await test.step('Verify that the filter dropdown is visible on the dashboard', async () => {
//         await expect.soft(problemUserDashboard.filterDropdown).toBeVisible();
//         await expect.soft(problemUserDashboard.filterDropdown).toContainText([
//             'Name (A to Z)',
//             'Name (Z to A)',
//             'Price (low to high)',
//             'Price (high to low)',
//         ]);

//     });
//     await test.step('Verify that the products are displayed on the dashboard', async () => {
//         for (const [i, expected] of problemUserDashboard.expectedProductImages.entries()) {
//         await expect.soft(problemUserDashboard.productImages.nth(i)).not.toHaveAttribute('src', expected.src);
//         await expect.soft(problemUserDashboard.productImages.nth(i)).not.toHaveAttribute('alt', expected.alt);
//     }
//     });
// });

// test('Performance Glitch User', async ({ loginPage,page }, testInfo) => {
//     const shot = new ScreenshotHelper(page, testInfo);
//     await test.step('Login with performance glitch user', async () => {
//         await loginPage.login('performance_glitch_user', 'secret_sauce');
//     });
//     await test.step('Verify that user is directed to Swag Labs inventory page', async () => {
//         await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
//         await shot.capture('User directed to inventory page');
//     });
//     await test.step('Verify that the inventory page loads within 5 seconds', async () => {
//         const startTime = Date.now();
//         await page.waitForSelector('.inventory_list');
//         const endTime = Date.now();
//         const loadTime = endTime - startTime;
//         console.log(`Inventory page load time: ${loadTime} ms`);
//         expect(loadTime).toBeLessThan(5000);
//     });
