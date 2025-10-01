const { test, expect } = require('@playwright/test');

// End-to-end test for multiply operation

test.describe('Calculator Multiply Operation', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for page to load
    await page.waitForLoadState('networkidle');
  });

  test('should multiply two positive numbers correctly', async ({ page }) => {
    // Clear the calculator first
    await page.locator('button[onclick="clearPressed()"]').first().click();

    // Test: 6 × 7 = 42
    await page.click('button:has-text("6")');
    await page.click('button:has-text("x")');
    await page.click('button:has-text("7")');
    await page.click('button:has-text("=")');

    // Wait for server response and verify result
    await page.waitForFunction(() => {
      const result = document.getElementById('result');
      return result && result.textContent.trim() === '42';
    }, { timeout: 5000 });
    
    const result = await page.textContent('#result');
    expect(result.trim()).toBe('42');
  });

  test('should handle multiply by zero', async ({ page }) => {
    // Clear the calculator
    await page.locator('button[onclick="clearPressed()"]').first().click();

    // Test: 5 × 0 = 0
    await page.click('button:has-text("5")');
    await page.click('button:has-text("x")');
    await page.click('button:has-text("0")');
    await page.click('button:has-text("=")');

    // Wait for calculation and verify result
    await page.waitForFunction(() => {
      const result = document.getElementById('result');
      return result && result.textContent.trim() === '0';
    }, { timeout: 5000 });
    
    const result = await page.textContent('#result');
    expect(result.trim()).toBe('0');
  });

  test('should handle decimal multiplication', async ({ page }) => {
    // Clear the calculator
    await page.locator('button[onclick="clearPressed()"]').first().click();

    // Test: 2.5 × 4 = 10
    await page.click('button:has-text("2")');
    await page.click('button:has-text(".")');
    await page.click('button:has-text("5")');
    await page.click('button:has-text("x")');
    await page.click('button:has-text("4")');
    await page.click('button:has-text("=")');

    // Wait for calculation and verify result
    await page.waitForFunction(() => {
      const result = document.getElementById('result');
      return result && result.textContent.trim() === '10';
    }, { timeout: 5000 });
    
    const result = await page.textContent('#result');
    expect(result.trim()).toBe('10');
  });

  test('should handle sequential multiply operations', async ({ page }) => {
    // Clear the calculator
    await page.locator('button[onclick="clearPressed()"]').first().click();

    // Test: 3 × 4 = 12
    await page.click('button:has-text("3")');
    await page.click('button:has-text("x")');
    await page.click('button:has-text("4")');
    await page.click('button:has-text("=")');
    
    // Wait for first calculation
    await page.waitForFunction(() => {
      const result = document.getElementById('result');
      return result && result.textContent.trim() === '12';
    }, { timeout: 5000 });
    
    let result = await page.textContent('#result');
    expect(result.trim()).toBe('12');
    
    // Continue with another multiplication: 12 × 2 = 24
    await page.click('button:has-text("x")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text("=")');
    
    // Wait for second calculation
    await page.waitForFunction(() => {
      const result = document.getElementById('result');
      return result && result.textContent.trim() === '24';
    }, { timeout: 5000 });
    
    result = await page.textContent('#result');
    expect(result.trim()).toBe('24');
  });

  test('should handle multiply with single digit numbers', async ({ page }) => {
    // Clear the calculator
    await page.locator('button[onclick="clearPressed()"]').first().click();

    // Test: 9 × 9 = 81
    await page.click('button:has-text("9")');
    await page.click('button:has-text("x")');
    await page.click('button:has-text("9")');
    await page.click('button:has-text("=")');

    // Wait for calculation and verify result
    await page.waitForFunction(() => {
      const result = document.getElementById('result');
      return result && result.textContent.trim() === '81';
    }, { timeout: 5000 });
    
    const result = await page.textContent('#result');
    expect(result.trim()).toBe('81');
  });

  test('should handle multiply with multi-digit numbers', async ({ page }) => {
    // Clear the calculator
    await page.locator('button[onclick="clearPressed()"]').first().click();

    // Test: 12 × 15 = 180
    await page.click('button:has-text("1")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text("x")');
    await page.click('button:has-text("1")');
    await page.click('button:has-text("5")');
    await page.click('button:has-text("=")');

    // Wait for calculation and verify result
    await page.waitForFunction(() => {
      const result = document.getElementById('result');
      return result && result.textContent.trim() === '180';
    }, { timeout: 5000 });
    
    const result = await page.textContent('#result');
    expect(result.trim()).toBe('180');
  });

  test('should multiply 4 x 5 correctly and get 20', async ({ page }) => {
    // Clear the calculator
    await page.locator('button[onclick="clearPressed()"]').first().click();

    // Test: 4 × 5 = 20
    await page.click('button:has-text("4")');
    await page.click('button:has-text("x")');
    await page.click('button:has-text("5")');
    await page.click('button:has-text("=")');

    // Wait for calculation and verify result
    await page.waitForFunction(() => {
      const result = document.getElementById('result');
      return result && result.textContent.trim() === '20';
    }, { timeout: 5000 });
    
    const result = await page.textContent('#result');
    expect(result.trim()).toBe('20');
  });

  test('should clear properly before new multiply operation', async ({ page }) => {
    // Clear the calculator
    await page.locator('button[onclick="clearPressed()"]').first().click();

    // First operation: 5 × 3 = 15
    await page.click('button:has-text("5")');
    await page.click('button:has-text("x")');
    await page.click('button:has-text("3")');
    await page.click('button:has-text("=")');
    
    // Wait for first calculation
    await page.waitForFunction(() => {
      const result = document.getElementById('result');
      return result && result.textContent.trim() === '15';
    }, { timeout: 5000 });

    // Clear and start new operation
    await page.locator('button[onclick="clearPressed()"]').first().click();
    
    // Verify cleared
    await page.waitForFunction(() => {
      const result = document.getElementById('result');
      return result && result.textContent.trim() === '0';
    }, { timeout: 2000 });

    // New operation: 8 × 4 = 32
    await page.click('button:has-text("8")');
    await page.click('button:has-text("x")');
    await page.click('button:has-text("4")');
    await page.click('button:has-text("=")');

    // Wait for second calculation
    await page.waitForFunction(() => {
      const result = document.getElementById('result');
      return result && result.textContent.trim() === '32';
    }, { timeout: 5000 });
    
    const result = await page.textContent('#result');
    expect(result.trim()).toBe('32');
  });
});
