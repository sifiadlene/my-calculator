const { test, expect } = require('@playwright/test');

test.describe('Calculator Basic Operations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Clear the calculator before each test using specific clear button
    await page.locator('button[onclick="clearPressed()"]').first().click();
  });

  test('should perform addition correctly', async ({ page }) => {
    // Test: 15 + 25 = 40
    await page.click('button:has-text("1")');
    await page.click('button:has-text("5")');
    await page.click('button:has-text("+")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text("5")');
    await page.click('button:has-text("=")');

    await page.waitForTimeout(1000); // Wait for server response
    const result = await page.textContent('#result');
    expect(result.trim()).toBe('40');
  });

  test('should perform subtraction correctly', async ({ page }) => {
    // Test: 50 - 18 = 32
    await page.click('button:has-text("5")');
    await page.click('button:has-text("0")');
    await page.click('button:has-text("-")');
    await page.click('button:has-text("1")');
    await page.click('button:has-text("8")');
    await page.click('button:has-text("=")');

    await page.waitForTimeout(1000); // Wait for server response
    const result = await page.textContent('#result');
    expect(result.trim()).toBe('32');
  });

  test('should perform division correctly', async ({ page }) => {
    // Test: 84 ÷ 12 = 7
    await page.click('button:has-text("8")');
    await page.click('button:has-text("4")');
    await page.click('button:has-text("÷")');
    await page.click('button:has-text("1")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text("=")');

    await page.waitForTimeout(1000); // Wait for server response
    const result = await page.textContent('#result');
    expect(result.trim()).toBe('7');
  });

  test('should handle decimal operations', async ({ page }) => {
    // Test: 3.5 + 2.1 = 5.6
    await page.click('button:has-text("3")');
    await page.click('button:has-text(".")');
    await page.click('button:has-text("5")');
    await page.click('button:has-text("+")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text(".")');
    await page.click('button:has-text("1")');
    await page.click('button:has-text("=")');

    await page.waitForTimeout(1000); // Wait for server response
    const result = await page.textContent('#result');
    expect(result.trim()).toBe('5.6');
  });

  test('should handle clear operations', async ({ page }) => {
    // Enter some numbers
    await page.click('button:has-text("1")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text("3")');

    // Check that numbers are displayed
    let result = await page.textContent('#result');
    expect(result.trim()).toBe('123');

    // Clear and check result is 0
    await page.locator('button[onclick="clearPressed()"]').first().click();
    result = await page.textContent('#result');
    expect(result.trim()).toBe('0');
  });

  test('should handle sequential operations', async ({ page }) => {
    // Test simple sequential operations: 10 + 5 = 15
    await page.click('button:has-text("1")');
    await page.click('button:has-text("0")');
    await page.click('button:has-text("+")');
    await page.click('button:has-text("5")');
    await page.click('button:has-text("=")');

    await page.waitForTimeout(1000);
    let result = await page.textContent('#result');
    expect(result.trim()).toBe('15');
    
    // Continue with subtraction: 15 - 3 = 12
    await page.click('button:has-text("-")');
    await page.click('button:has-text("3")');
    await page.click('button:has-text("=")');

    await page.waitForTimeout(1000);
    result = await page.textContent('#result');
    expect(result.trim()).toBe('12');
  });
});