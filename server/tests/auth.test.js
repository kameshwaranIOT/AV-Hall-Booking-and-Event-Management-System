import test from 'node:test';
import assert from 'node:assert/strict';
import User from '../models/User.js';

test('supports the recommended account roles for event management users', () => {
  const validRoles = ['admin', 'organizer', 'faculty', 'student', 'viewer', 'user'];

  for (const role of validRoles) {
    const user = new User({
      name: 'Sample User',
      email: `user-${role}@example.com`,
      password: 'Password123',
      department: 'CSE - IoT',
      phone: '+91 98765 43210',
      role,
    });

    const error = user.validateSync();
    assert.equal(error, null, `role '${role}' should be accepted`);
  }
});
