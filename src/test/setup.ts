import '@testing-library/jest-dom/vitest';
import { expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import 'vitest-dom/extend-expect';

expect.extend(matchers);