import { expect, test } from '@playwright/test';

test('caregiver starts visit workflow', async ({ page }) => {
  await page.goto('/workflow');
  await page.getByRole('button', { name: 'Start Visit' }).click();
  await expect(page.getByText(/Visit started|Stored offline/)).toBeVisible();
});
