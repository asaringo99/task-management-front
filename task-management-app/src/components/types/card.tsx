import React, { useState } from 'react';

export interface CardType {
    id: string;
    text: string
    menuItems: { label: string, action: () => void}[];
}